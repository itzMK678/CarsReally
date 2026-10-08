const mongoose = require("mongoose");

const ParticipantSchema = new mongoose.Schema(
  {
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: false,
    },
    eventName: {
      type: String,
      required: [true, "Event name is required"],
      trim: true,
    },
    name: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: [true, "Gender is required"],
    },
    age: {
      type: Number,
      min: [16, "Minimum participation age is 16"],
      max: [100, "Invalid age"],
      required: [true, "Age is required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.Participant ||
  mongoose.model("Participant", ParticipantSchema);
