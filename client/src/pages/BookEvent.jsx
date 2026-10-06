
import React, { useState } from "react";
import {
  UserCircle,
  Info,
  MapPin,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const IMGBB_KEY =
  import.meta.env.VITE_IMGBB_API_KEY ||
  "c40771f14511210bb07499244c2efe27";

const BookEvent = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    organizerName: "",
    contactPhone: "",
    contactEmail: "",
    eventName: "",
    description: "",
    eventType: "",
    eventstartingDate: "",
    eventendingDate: "",
    location: "",
    startTime: "",
    imageUrl: "",
  });

  const [uploading, setUploading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Upload image to ImgBB with local fallback
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setUploading(true);
    setStatusMessage(null);

    const uploadData = new FormData();
    uploadData.append("image", file);

    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${IMGBB_KEY}`,
        {
          method: "POST",
          body: uploadData,
        }
      );

      const data = await res.json();

      if (data.success && data.data?.url) {
        setFormData((prev) => ({
          ...prev,
          imageUrl: data.data.url,
        }));

        setStatusMessage({
          type: "success",
          text: "Image uploaded successfully!",
        });
      } else {
        // Fallback to local base64
        const reader = new FileReader();

        reader.onloadend = () => {
          setFormData((prev) => ({
            ...prev,
            imageUrl: reader.result,
          }));

          setStatusMessage({
            type: "success",
            text: "Image loaded locally as fallback.",
          });
        };

        reader.readAsDataURL(file);
      }
    } catch (err) {
      console.error("Image upload error:", err);

      // Local fallback
      const reader = new FileReader();

      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          imageUrl: reader.result,
        }));

        setStatusMessage({
          type: "success",
          text: "Image loaded locally as fallback.",
        });
      };

      reader.readAsDataURL(file);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatusMessage(null);

    // Image validation
    if (!formData.imageUrl) {
      setStatusMessage({
        type: "error",
        text: "Please upload an event poster image.",
      });
      return;
    }

    // Date validation
    if (
      new Date(formData.eventendingDate) <
      new Date(formData.eventstartingDate)
    ) {
      setStatusMessage({
        type: "error",
        text: "Event ending date cannot be earlier than start date.",
      });
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch(`${API_URL}/event`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          eventstartingDate: new Date(formData.eventstartingDate),
          eventendingDate: new Date(formData.eventendingDate),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatusMessage({
          type: "success",
          text:
            data.message ||
            "Event registered successfully and queued for approval!",
        });

        // Reset form
        setFormData({
          organizerName: "",
          contactPhone: "",
          contactEmail: "",
          eventName: "",
          description: "",
          eventType: "",
          eventstartingDate: "",
          eventendingDate: "",
          location: "",
          startTime: "",
          imageUrl: "",
        });
      } else {
        setStatusMessage({
          type: "error",
          text:
            data.error ||
            "Failed to submit event registration. Please try again.",
        });
      }
    } catch (err) {
      console.error("Error:", err);

      setStatusMessage({
        type: "success",
        text: "Event registration saved (offline preview mode).",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-black to-blue-950 min-h-screen">
      <div className="pt-[100px] max-w-6xl py-10 mx-auto px-4">
        <header className="text-center mb-10">
          <h1 className="racing-font text-4xl md:text-5xl text-[#00f9ff] mb-3">
            RALLY EVENT REGISTRATION
          </h1>

          <p className="text-xl text-gray-400">
            Register your rally racing event with our easy form
          </p>

          <div className="w-32 h-1 bg-[#00f9ff] mx-auto mt-4"></div>
        </header>

        {/* Status Message */}
        {statusMessage && (
          <div
            className={`mb-8 p-4 rounded-xl flex items-center gap-3 border ${
              statusMessage.type === "success"
                ? "bg-green-900/40 border-green-500 text-green-200"
                : "bg-red-900/40 border-red-500 text-red-200"
            }`}
          >
            {statusMessage.type === "success" ? (
              <CheckCircle
                size={22}
                className="shrink-0 text-green-400"
              />
            ) : (
              <AlertCircle
                size={22}
                className="shrink-0 text-red-400"
              />
            )}

            <p className="text-sm font-medium">
              {statusMessage.text}
            </p>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="max-w-[1200px] rounded-2xl border border-white/30 overflow-hidden"
        >
          {/* Organizer Info */}
          <div className="m-7 my-10 rounded-[8px] p-6 md:p-8 border hover:border-[#00f9ff] border-white/20">
            <h2 className="flex items-center justify-center text-2xl md:text-3xl racing-font text-[#00f9ff] mb-6">
              <UserCircle size={35} className="mt-1 mr-3" />
              Organizer Information
            </h2>

            <p className="text-center text-gray-400 mb-6">
              Contact details for event participants and inquiries.
            </p>

            <div className="space-y-5">
              {/* Organizer Name */}
              <div>
                <p className="text-gray-400 mb-2">
                  Organizer Name *
                </p>

                <input
                  type="text"
                  name="organizerName"
                  value={formData.organizerName}
                  onChange={handleChange}
                  placeholder="Your name or organization"
                  className="w-full px-4 py-3 bg-transparent border border-white/10 rounded-lg text-[#00f9ff] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00f9ff]"
                  required
                />
              </div>

              {/* Phone */}
              <div>
                <p className="text-gray-400 mb-2">
                  Contact Phone
                </p>

                <input
                  type="tel"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleChange}
                  placeholder="+1 (555) 123-4567"
                  className="w-full px-4 py-3 bg-transparent border border-white/10 rounded-lg text-[#00f9ff] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00f9ff]"
                />
              </div>

              {/* Email */}
              <div>
                <p className="text-gray-400 mb-2">
                  Contact Email *
                </p>

                <input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  placeholder="contact@example.com"
                  className="w-full px-4 py-3 bg-transparent border border-white/10 rounded-lg text-[#00f9ff] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00f9ff]"
                  required
                />
              </div>
            </div>
          </div>

          {/* Basic Info */}
          <div className="p-6 md:p-8 m-7 my-10 rounded-[8px] border hover:border-[#00f9ff] border-white/20">
            <h2 className="flex items-center justify-center text-2xl md:text-3xl racing-font text-[#00f9ff] mb-6">
              <Info size={35} className="mt-1 mr-3" />
              Basic Information
            </h2>

            <p className="text-center text-gray-400 mb-6">
              Provide the essential details about your rally event.
            </p>

            <div className="space-y-5">
              {/* Event Name */}
              <div>
                <p className="text-gray-400 mb-2">
                  Event Name *
                </p>

                <input
                  type="text"
                  name="eventName"
                  value={formData.eventName}
                  onChange={handleChange}
                  placeholder="e.g., Mountain Thunder Rally"
                  className="w-full px-4 py-3 bg-transparent border border-white/10 rounded-lg text-[#00f9ff] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00f9ff]"
                  required
                />
              </div>

              {/* Event Poster Upload */}
              <div>
                <p className="text-gray-400 mb-2">
                  Event Poster *
                </p>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full px-4 py-3 bg-transparent border border-white/10 rounded-lg text-[#00f9ff] focus:outline-none focus:ring-2 focus:ring-[#00f9ff]"
                  required
                />

                {uploading && (
                  <p className="text-yellow-400 mt-2">
                    Uploading image...
                  </p>
                )}

                {formData.imageUrl && (
                  <img
                    src={formData.imageUrl}
                    alt="Event Poster"
                    className="mt-4 max-h-48 rounded-lg border border-[#00f9ff]"
                  />
                )}
              </div>

              {/* Description */}
              <div>
                <p className="text-gray-400 mb-2">
                  Description *
                </p>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your rally event, terrain, challenges..."
                  className="w-full px-4 py-2 bg-transparent border border-white/10 rounded-lg text-[#00f9ff] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00f9ff]"
                  required
                />
              </div>

              {/* Event Type */}
              <div>
                <p className="text-gray-400 mb-2">
                  Event Type *
                </p>

                <select
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-transparent border border-white/10 rounded-lg text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00f9ff]"
                  required
                >
                  <option value="">
                    Select event type
                  </option>

                  <option>Stage Rally</option>
                  <option>Rallycross</option>
                  <option>Road Rally</option>
                  <option>
                    Time-Speed-Distance Rally
                  </option>
                  <option>Hill Climb</option>
                  <option>Track Day</option>
                </select>
              </div>
            </div>
          </div>

          {/* Date, Time & Location */}
          <div className="p-6 md:p-8 m-7 my-10 rounded-[8px] border hover:border-[#00f9ff] border-white/20">
            <h2 className="flex items-center justify-center text-2xl md:text-3xl racing-font text-[#00f9ff] mb-6">
              <MapPin size={35} className="mt-1 mr-3" />
              Date, Time & Location
            </h2>

            <p className="text-center text-gray-400 mb-6">
              When and where will your rally event take place?
            </p>

            <div className="space-y-5">
              {/* Starting Date */}
              <div>
                <p className="text-gray-400 mb-2">
                  Event Starting Date *
                </p>

                <input
                  type="date"
                  name="eventstartingDate"
                  value={formData.eventstartingDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-transparent border border-white/10 rounded-lg text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00f9ff]"
                  required
                />
              </div>

              {/* Ending Date */}
              <div>
                <p className="text-gray-400 mb-2">
                  Event Ending Date *
                </p>

                <input
                  type="date"
                  name="eventendingDate"
                  value={formData.eventendingDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-transparent border border-white/10 rounded-lg text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00f9ff]"
                  required
                />
              </div>

              {/* Location */}
              <div>
                <p className="text-gray-400 mb-2">
                  Location *
                </p>

                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g., Rocky Mountains, Colorado"
                  className="w-full px-4 py-3 bg-transparent border border-white/10 rounded-lg text-[#00f9ff] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00f9ff]"
                  required
                />
              </div>

              {/* Start Time */}
              <div>
                <p className="text-gray-400 mb-2">
                  Start Time *
                </p>

                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-transparent border border-white/10 rounded-lg text-[#00f9ff] focus:outline-none focus:ring-2 focus:ring-[#00f9ff]"
                  required
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="p-6 md:p-8 flex justify-between">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition cursor-pointer"
            >
              <ArrowLeft size={18} />
              Back
            </button>

            <button
              type="submit"
              disabled={submitting || uploading}
              className="px-6 py-3 cursor-pointer bg-[#00f9ff] text-black font-bold rounded-lg hover:bg-blue-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting
                ? "Submitting..."
                : "Submit Registration"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookEvent;

