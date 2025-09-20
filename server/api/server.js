const express = require ("express")
const Mailjet= require( "node-mailjet");
const mailjet = Mailjet.apiConnect(
  "5e46231f2d632b61913d79ad6a9002c7",   // Put your Mailjet Public Key
  "58d9356bd99bebfb25d989b82e462a6e"   // Put your Mailjet Secret Key
);
const cors = require ("cors")
const Stripe = require("stripe");
const path = require ("path")
const connectToDb = require("../DB.js")
const app = express();
const Event = require("../models/EventSchema.js")
const PORT = 5000;
const stripe = new Stripe("sk_test_51S8nLHPB7TNnctoCWxgn9ZsCRiyVEDn9fm85ZqEZZYhdPkfcQEiBQLy5XnUaMdUnkcOIe7iGbCvzRhzCu33DXU6P003QGxphDS");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

connectToDb();

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

    // Basic validation (backend should always validate, even if frontend does)
    if (!organizerName || !contactEmail || !eventName || !description || !eventType || !eventstartingDate || !eventendingDate || !location || !startTime || !imageUrl) {
      return res.status(400).send("❌ Missing required fields");
    }

    // Create new event document
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

    res.status(201).send("✅ Event created successfully");
  } catch (err) {
    console.error("❌ Error creating event:", err);
    res.status(500).send("❌ Error creating event");
  }
});

app.get("/getEvent", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    console.error("❌ Error fetching events:", err);
    res.status(500).json({ message: "Error fetching events" });
  }
});
app.post("/create-payment-intent", async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({ error: "Amount is required" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount, // amount in cents
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("❌ Stripe Error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/sendMail", async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    const result = await mailjet
      .post("send", { version: "v3.1" })
      .request({
        Messages: [
          {
            From: {
              Email: "m.mamoon.khaliq@gmail.com", // company sender email
              Name: "Company Support",
            },
            To: [
              {
                Email: "m.mamoon.khaliq@gmail.com", // company inbox
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

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});