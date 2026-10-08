const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
  {
    organizerName: {
      type: String,
      required: [true, "Organizer name is required"],
      trim: true,
      maxlength: [100, "Organizer name cannot exceed 100 characters"],
    },
    Permission: {
      type: Boolean,
      default: false,
      index: true,
    },
    imageUrl: {
      type: String,
      required: [true, "Image URL is required"],
      trim: true,
    },
    contactPhone: {
      type: String,
      trim: true,
      default: "",
    },
    contactEmail: {
      type: String,
      required: [true, "Contact email is required"],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },

    // Basic Information
    eventName: {
      type: String,
      required: [true, "Event name is required"],
      trim: true,
      maxlength: [150, "Event name cannot exceed 150 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: [3000, "Description cannot exceed 3000 characters"],
    },
    eventType: {
      type: String,
      required: [true, "Event type is required"],
      enum: [
        "Stage Rally",
        "Rallycross",
        "Road Rally",
        "Time-Speed-Distance Rally",
        "Hill Climb",
        "Track Day",
        "Exhibition",
      ],
      default: "Stage Rally",
    },

    // Date, Time & Location
    eventstartingDate: {
      type: Date,
      required: [true, "Starting date is required"],
      index: true,
    },
    eventendingDate: {
      type: Date,
      required: [true, "Ending date is required"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
      maxlength: [200, "Location cannot exceed 200 characters"],
    },
    startTime: {
      type: String,
      required: [true, "Start time is required"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Virtuals for alias compatibility
EventSchema.virtual("title").get(function () {
  return this.eventName;
});

EventSchema.virtual("image").get(function () {
  return this.imageUrl;
});

EventSchema.set("toJSON", { virtuals: true });
EventSchema.set("toObject", { virtuals: true });

module.exports = mongoose.models.Event || mongoose.model("Event", EventSchema);
