// server/api/index.js
require("dotenv").config({
  path: require("path").resolve(__dirname, "../.env"),
});

const express = require("express");
const Mailjet = require("node-mailjet");
const cors = require("cors");
const Stripe = require("stripe");
const path = require("path");
const http = require("http");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");
const { Server } = require("socket.io");

// DB + Schema
const connectToDb = require("../DB.js");
const Event = require("../models/EventsShema.js");

// --- Setup ---
const app = express();
const server = http.createServer(app);

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",").map((s) => s.trim())
  : ["http://localhost:5173", "http://localhost:3000"];

const corsOptions = {
  origin: (origin, callback) => {
    // allow requests with no origin (like mobile apps, curl, server-to-server)
    if (!origin || allowedOrigins.includes(origin) || allowedOrigins.includes("*")) {
      callback(null, true);
    } else {
      callback(null, true); // Permissive in dev, but structured
    }
  },
  credentials: true,
};

const io = new Server(server, {
  cors: {
    origin: allowedOrigins.includes("*") ? "*" : allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

const PORT = process.env.PORT || 5000;

// Initialize Stripe safely
let stripe = null;
if (process.env.STRIPE_SECRET_KEY) {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
} else {
  console.warn("⚠️ STRIPE_SECRET_KEY is not set. Stripe endpoints will be disabled.");
}

// Initialize Mailjet safely
let mailjet = null;
if (process.env.MJ_APIKEY_PUBLIC && process.env.MJ_APIKEY_PRIVATE) {
  mailjet = Mailjet.apiConnect(
    process.env.MJ_APIKEY_PUBLIC,
    process.env.MJ_APIKEY_PRIVATE
  );
} else {
  console.warn("⚠️ Mailjet API keys not set. Email delivery will be simulated.");
}

// --- Middleware ---
app.use(helmet({ contentSecurityPolicy: false })); // Basic security headers
app.use(morgan("dev")); // HTTP request logger
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, "public")));

// --- Connect to DB ---
connectToDb();

// --- SOCKET.IO ---
io.on("connection", (socket) => {
  console.log("✅ Client connected to Socket.IO:", socket.id);

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected from Socket.IO:", socket.id);
  });
});

// --- HELPER FUNCTIONS ---
function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// --- ROUTES ---

// Health Check
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "CarsReally API server is running",
    timestamp: new Date().toISOString(),
  });
});

// Create Event
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

    // Validate required fields
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
      return res.status(400).json({ error: "Missing required fields" });
    }

    const startDate = new Date(eventstartingDate);
    const endDate = new Date(eventendingDate);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return res.status(400).json({ error: "Invalid date format" });
    }

    if (endDate < startDate) {
      return res.status(400).json({ error: "End date cannot be earlier than start date" });
    }

    const newEvent = new Event({
      organizerName,
      contactPhone: contactPhone || "",
      contactEmail,
      eventName,
      description,
      eventType,
      imageUrl,
      eventendingDate: endDate,
      eventstartingDate: startDate,
      location,
      startTime,
    });

    await newEvent.save();

    // Broadcast update to all connected clients
    io.emit("eventUpdated", newEvent);

    return res.status(201).json({
      success: true,
      message: "Event registered successfully and pending approval",
      event: newEvent,
    });
  } catch (err) {
    console.error("❌ Error creating event:", err);
    return res.status(500).json({ error: err.message || "Error creating event" });
  }
});

// Get all events (admin view)
app.get("/getEvent", async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json(events);
  } catch (err) {
    console.error("❌ Error fetching events:", err);
    res.status(500).json({ error: "Error fetching events" });
  }
});

// Get only approved events (public view)
app.get("/trueEvents", async (req, res) => {
  try {
    const events = await Event.find({ Permission: true }).sort({ eventstartingDate: 1 });
    res.json(events);
  } catch (err) {
    console.error("❌ Error fetching events:", err);
    res.status(500).json({ error: "Error fetching events" });
  }
});

// Update permission (Approve / Reject)
app.put("/events/:id/permission", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid Event ID format" });
    }

    const newPermissionState = req.body.Permission !== undefined ? Boolean(req.body.Permission) : true;

    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      { Permission: newPermissionState },
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ error: "Event not found" });
    }

    // Broadcast to clients
    io.emit("eventUpdated", updatedEvent);

    res.json({
      success: true,
      message: `Permission updated to ${newPermissionState}`,
      event: updatedEvent,
    });
  } catch (err) {
    console.error("❌ Error updating event permission:", err);
    res.status(500).json({ error: "Error updating permission" });
  }
});

// Delete an event (admin action)
app.delete("/events/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid Event ID format" });
    }

    const deleted = await Event.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: "Event not found" });
    }

    io.emit("eventDeleted", { id });

    res.json({ success: true, message: "Event deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting event:", err);
    res.status(500).json({ error: "Error deleting event" });
  }
});

// Stripe Payment Intent Creation
app.post("/create-payment-intent", async (req, res) => {
  if (!stripe) {
    return res.status(503).json({ error: "Stripe service is not configured on this server" });
  }

  try {
    const { amount, serviceType } = req.body;

    const parsedAmount = parseInt(amount, 10);
    if (!parsedAmount || parsedAmount < 50 || parsedAmount > 1000000) {
      return res.status(400).json({ error: "Invalid payment amount (minimum $0.50)" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: parsedAmount,
      currency: "usd",
      metadata: {
        serviceType: serviceType || "VIP Subscription",
      },
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

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "Please fill out all required fields" });
  }

  const safeName = escapeHtml(name.trim());
  const safeEmail = escapeHtml(email.trim());
  const safeSubject = escapeHtml(subject.trim());
  const safeMessage = escapeHtml(message.trim());

  if (!mailjet) {
    console.log("📨 [Simulated Mail]:", { safeName, safeEmail, safeSubject, safeMessage });
    return res.status(200).json({
      success: true,
      message: "Message received (Mailjet credentials not configured, simulated delivery)",
    });
  }

  try {
    const result = await mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: process.env.MAIL_FROM_EMAIL || "noreply@carsreally.com",
            Name: process.env.MAIL_FROM_NAME || "CarsReally Support",
          },
          To: [
            {
              Email: process.env.MAIL_TO_EMAIL || "admin@carsreally.com",
              Name: process.env.MAIL_TO_NAME || "CarsReally Inbox",
            },
          ],
          ReplyTo: {
            Email: email,
            Name: name,
          },
          Subject: `CarsReally Query: ${safeSubject}`,
          TextPart: `From: ${name} (${email})\n\n${message}`,
          HTMLPart: `<h3>New Message from ${safeName}</h3>
                     <p><b>Email:</b> ${safeEmail}</p>
                     <p><b>Subject:</b> ${safeSubject}</p>
                     <p><b>Message:</b></p>
                     <p>${safeMessage}</p>`,
        },
      ],
    });

    res.status(200).json({ success: true, message: "Email sent successfully", result: result.body });
  } catch (err) {
    console.error("❌ Mailjet Error:", err);
    res.status(500).json({ success: false, error: err.message || "Failed to send email" });
  }
});

// --- START SERVER ---
if (process.env.NODE_ENV !== "test") {
  server.listen(PORT, "0.0.0.0", () => {
    console.log(`✅ CarsReally Server running on port ${PORT}`);
  });
}

module.exports = app;

