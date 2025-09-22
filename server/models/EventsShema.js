const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({

  organizerName: {
    type: String,
    required: true,
    trim: true,
  },
Permission: {
  type: Boolean,
  default: false ,
},
  imageUrl:{
    type:String,
    require:true,
    trim:true,
  },
  contactPhone: {
    type: String,
    trim: true,
  },
  contactEmail: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },

  // Basic Information
  eventName: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  eventType: {
    type: String,
    required: true,
    enum: [
      "Stage Rally",
      "Rallycross",
      "Road Rally",
      "Time-Speed-Distance Rally",
      "Hill Climb",
    ],
  },

  // Date, Time & Location
  eventstartingDate: {
    type: Date,
    required: true,
  },
    eventendingDate: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  startTime: {
    type: String,
    required: true,
  },

  // Meta
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Event", EventSchema);
