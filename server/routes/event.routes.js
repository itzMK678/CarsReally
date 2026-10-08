const express = require("express");
const mongoose = require("mongoose");
const Event = require("../models/Event.js");
const Participant = require("../models/Participant.js");
const { verifyToken, requireAdmin } = require("../middlewares/auth.middleware.js");
// const { getIO } = require("../config/socket.js"); // Uncomment when Socket.IO is enabled

const router = express.Router();

// -------------------------------------------------------------
// PUBLIC ROUTES
// -------------------------------------------------------------

// POST /event (or /api/events) - Create / Register new event
router.post(["/event", "/"], async (req, res) => {
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
      return res.status(400).json({ success: false, error: "Missing required fields" });
    }

    const startDate = new Date(eventstartingDate);
    const endDate = new Date(eventendingDate);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return res.status(400).json({ success: false, error: "Invalid date format" });
    }

    if (endDate < startDate) {
      return res.status(400).json({
        success: false,
        error: "End date cannot be earlier than start date",
      });
    }

    const newEvent = new Event({
      organizerName: organizerName.trim(),
      contactPhone: contactPhone ? contactPhone.trim() : "",
      contactEmail: contactEmail.toLowerCase().trim(),
      eventName: eventName.trim(),
      description: description.trim(),
      eventType,
      imageUrl: imageUrl.trim(),
      eventendingDate: endDate,
      eventstartingDate: startDate,
      location: location.trim(),
      startTime: startTime.trim(),
      Permission: false, // Pending admin approval by default
    });

    await newEvent.save();

    // Socket.IO realtime broadcast (Commented out - uncomment when Socket.IO is enabled)
    /*
    const io = getIO();
    if (io) {
      io.emit("eventUpdated", newEvent);
    }
    */

    return res.status(201).json({
      success: true,
      message: "Event registered successfully and pending approval",
      event: newEvent,
    });
  } catch (err) {
    console.error("❌ Error creating event:", err);
    return res.status(500).json({
      success: false,
      error: err.message || "Error creating event",
    });
  }
});

// GET /trueEvents (or /api/events/public) - Get only approved events (Public view)
router.get(["/trueEvents", "/public"], async (req, res) => {
  try {
    const events = await Event.find({ Permission: true })
      .sort({ eventstartingDate: 1 })
      .limit(100);

    return res.json(events);
  } catch (err) {
    console.error("❌ Error fetching approved events:", err);
    return res.status(500).json({ success: false, error: "Error fetching events" });
  }
});

// GET /events/:id (or /api/events/:id) - Get single event by ID
router.get("/:id", async (req, res, next) => {
  // Pass to next if route is special
  if (["getEvent", "trueEvents", "public", "event"].includes(req.params.id)) {
    return next();
  }

  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: "Invalid Event ID format" });
    }

    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ success: false, error: "Event not found" });
    }

    return res.json({ success: true, event });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// POST /participate (or /api/events/participate) - Register participant for an event
router.post(["/participate", "/participants"], async (req, res) => {
  try {
    const { eventId, eventName, name, email, gender, age } = req.body;

    if (!eventName || !name || !email || !gender || !age) {
      return res.status(400).json({
        success: false,
        error: "Please fill out all required participant fields",
      });
    }

    const participant = new Participant({
      eventId: mongoose.Types.ObjectId.isValid(eventId) ? eventId : undefined,
      eventName: eventName.trim(),
      name: name.trim(),
      email: email.toLowerCase().trim(),
      gender,
      age: Number(age),
    });

    await participant.save();

    return res.status(201).json({
      success: true,
      message: `Registration confirmed for ${eventName}!`,
      participant,
    });
  } catch (err) {
    console.error("❌ Participation error:", err);
    return res.status(500).json({
      success: false,
      error: err.message || "Failed to register participation",
    });
  }
});

// -------------------------------------------------------------
// ADMIN PROTECTED ROUTES (Requires JWT token)
// -------------------------------------------------------------

// GET /getEvent (or /api/events) - Get all events for Admin Moderation
router.get(["/getEvent", "/"], async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    return res.json(events);
  } catch (err) {
    console.error("❌ Error fetching all events:", err);
    return res.status(500).json({ success: false, error: "Error fetching events" });
  }
});

// PUT /events/:id/permission - Moderate event (Approve/Reject)
router.put(["/events/:id/permission", "/:id/permission"], verifyToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: "Invalid Event ID format" });
    }

    const newPermissionState =
      req.body.Permission !== undefined
        ? Boolean(req.body.Permission)
        : req.body.permission !== undefined
        ? Boolean(req.body.permission)
        : true;

    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      { Permission: newPermissionState },
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ success: false, error: "Event not found" });
    }

    // Socket.IO realtime broadcast (Commented out - uncomment when Socket.IO is enabled)
    /*
    const io = getIO();
    if (io) {
      io.emit("eventUpdated", updatedEvent);
    }
    */

    return res.json({
      success: true,
      message: `Event permission updated to ${newPermissionState}`,
      event: updatedEvent,
    });
  } catch (err) {
    console.error("❌ Error updating event permission:", err);
    return res.status(500).json({ success: false, error: "Error updating permission" });
  }
});

// DELETE /events/:id - Delete an event (Admin action)
router.delete(["/events/:id", "/:id"], verifyToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: "Invalid Event ID format" });
    }

    const deleted = await Event.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, error: "Event not found" });
    }

    // Socket.IO realtime broadcast (Commented out - uncomment when Socket.IO is enabled)
    /*
    const io = getIO();
    if (io) {
      io.emit("eventDeleted", { id });
    }
    */

    return res.json({ success: true, message: "Event deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting event:", err);
    return res.status(500).json({ success: false, error: "Error deleting event" });
  }
});

// GET /events/:id/participants - View participants registered for an event
router.get(["/events/:id/participants", "/:id/participants"], verifyToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const participants = await Participant.find({ eventId: id }).sort({ createdAt: -1 });
    return res.json({ success: true, count: participants.length, participants });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
