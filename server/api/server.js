const express = require ("express")
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

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});