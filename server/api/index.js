// server.js
const express = require("express");
const Mailjet = require("node-mailjet");
const cors = require("cors");
const Stripe = require("stripe");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");

// DB + Schema
const connectToDb = require("../DB.js");
const Event = require("../models/EventSchema.js");

// --- Setup ---
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // allow frontend
    methods: ["GET", "POST", "PUT"],
  },
});

const PORT = 5000;
const stripe = new Stripe("sk_test_51S8nLHPB7TNnctoCWxgn9ZsCRiyVEDn9fm85ZqEZZYhdPkfcQEiBQLy5XnUaMdUnkcOIe7iGbCvzRhzCu33DXU6P003QGxphDS");

// Mailjet
const mailjet = Mailjet.apiConnect(
  "5e46231f2d632b61913d79ad6a9002c7", // Public key
  "58d9356bd99bebfb25d989b82e462a6e"  // Secret key
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

// Connect DB
connectToDb();

// --- SOCKET.IO ---
io.on("connection", (socket) => {
  console.log("✅ User connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

// --- ROUTES ---
// Create Event
app.get('/',async(req,res)=>{
  return {
    "Name":"Race Fusion",
    "Health":"OK"
  }
})
app.post("/event", async (req, res) => {
  try {
    const {
      organizerName,
      contactPhone,
      contactEmail,
      eventName,
      description,
      eventType,
      eventendingDate,
      eventstartingDate,
      location,
      imageUrl,
      startTime,
    } = req.body;

    if (
      !organizerName ||
      !contactEmail ||
      !eventName ||
      !description ||
      !eventType ||
      !eventstartingDate ||
      !eventendingDate ||
      !location ||
      !startTime ||
      !imageUrl
    ) {
      return res.status(400).send("❌ Missing required fields");
    }

    const newEvent = new Event({
      organizerName,
      contactPhone,
      contactEmail,
      eventName,
      description,
      eventType,
      imageUrl,
      eventendingDate: new Date(eventendingDate),
      eventstartingDate: new Date(eventstartingDate),
      location,
      startTime,
    });

    await newEvent.save();

    // Notify all clients via socket
    io.emit("eventUpdated", newEvent);

    res.status(201).json(newEvent);
  } catch (err) {
    console.error("❌ Error creating event:", err);
    res.status(500).send("❌ Error creating event");
  }
});

// Get all events
app.get("/getEvent", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    console.error("❌ Error fetching events:", err);
    res.status(500).json({ message: "Error fetching events" });
  }
});

// Get only approved events
app.get("/trueEvents", async (req, res) => {
  try {
    const events = await Event.find({ Permission: true });
    res.json(events);
  } catch (err) {
    console.error("❌ Error fetching events:", err);
    res.status(500).json({ message: "Error fetching events" });
  }
});

// Update permission
app.put("/events/:id/permission", async (req, res) => {
  try {
    const { id } = req.params;

    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      { Permission: true },
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Notify clients
    io.emit("eventUpdated", updatedEvent);

    res.json({ message: "Permission updated to true", event: updatedEvent });
  } catch (err) {
    console.error("❌ Error updating event permission:", err);
    res.status(500).json({ message: "Error updating permission" });
  }
});

// Stripe Payment
app.post("/create-payment-intent", async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({ error: "Amount is required" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("❌ Stripe Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Mailjet Contact Form
app.post("/sendMail", async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    const result = await mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: "m.mamoon.khaliq@gmail.com",
            Name: "Company Support",
          },
          To: [
            {
              Email: "m.mamoon.khaliq@gmail.com",
              Name: "Company Inbox",
            },
          ],
          Subject: subject,
          TextPart: `From: ${name} (${email})\n\n${message}`,
          HTMLPart: `<h3>New Message from ${name}</h3>
                     <p><b>Email:</b> ${email}</p>
                     <p><b>Message:</b> ${message}</p>`,
        },
      ],
    });

    res.status(200).json({ success: true, result: result.body });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// --- START SERVER ---
server.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
