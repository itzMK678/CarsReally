const express = require ("express")
const cors = require ("cors")
const path = require ("path")
const connectToDb = require("../DB.js")
const app = express();
const Event = require("../models/EventSchema.js")
const PORT = 5000;
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
      startTime,
    } = req.body;

    const newEvent = new Event({
      organizerName,
      contactPhone,
      contactEmail,
      eventName,
      description,
      eventType,
      eventendingDate,
      eventstartingDate,
      location,
      startTime,
    });

    await newEvent.save();
 res.send("✅ User created successfully");
  } catch (err) {
    console.error("❌ Error creating user:", err);
    res.status(500).send("❌ Error creating user");
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
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});