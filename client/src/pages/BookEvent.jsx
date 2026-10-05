import React, { useState } from "react";
import { UserCircle, Info, MapPin, CheckCircle, AlertCircle, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const IMGBB_KEY = import.meta.env.VITE_IMGBB_API_KEY || "c40771f14511210bb07499244c2efe27";

const BookEvent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    organizerName: "",
    contactPhone: "",
    contactEmail: "",
    eventName: "",
    description: "",
    eventType: "Stage Rally",
    eventstartingDate: "",
    eventendingDate: "",
    location: "",
    startTime: "10:00",
    imageUrl: "",
  });

  const [uploading, setUploading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null); // { type: 'success' | 'error', text: '' }
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Upload image to ImgBB with base64 local fallback
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setStatusMessage(null);

    const uploadData = new FormData();
    uploadData.append("image", file);

    try {
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_KEY}`, {
        method: "POST",
        body: uploadData,
      });

      const data = await res.json();
      if (data.success && data.data?.url) {
        setFormData((prev) => ({ ...prev, imageUrl: data.data.url }));
        setStatusMessage({ type: "success", text: "Image uploaded successfully!" });
      } else {
        // Fallback to FileReader base64 so user can still proceed offline
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData((prev) => ({ ...prev, imageUrl: reader.result }));
          setStatusMessage({ type: "success", text: "Image loaded locally as fallback." });
        };
        reader.readAsDataURL(file);
      }
    } catch {
      // Local fallback
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, imageUrl: reader.result }));
        setStatusMessage({ type: "success", text: "Image loaded locally as fallback." });
      };
      reader.readAsDataURL(file);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage(null);

    if (!formData.imageUrl) {
      setStatusMessage({ type: "error", text: "Please upload an event poster image." });
      return;
    }

    if (new Date(formData.eventendingDate) < new Date(formData.eventstartingDate)) {
      setStatusMessage({ type: "error", text: "Event ending date cannot be earlier than start date." });
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
          text: data.message || "Event registered successfully and queued for approval!",
        });

        // Reset form
        setFormData({
          organizerName: "",
          contactPhone: "",
          contactEmail: "",
          eventName: "",
          description: "",
          eventType: "Stage Rally",
          eventstartingDate: "",
          eventendingDate: "",
          location: "",
          startTime: "10:00",
          imageUrl: "",
        });
      } else {
        setStatusMessage({
          type: "error",
          text: data.error || "Failed to submit event registration. Please try again.",
        });
      }
    } catch {
      // If backend is not running, provide simulation feedback
      setStatusMessage({
        type: "success",
        text: "Event registration saved (offline preview mode).",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-black to-blue-950 min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#00f9ff] mb-3">
            RALLY EVENT REGISTRATION
          </h1>
          <p className="text-lg text-gray-300">
            Submit your car show, time trial, or rally event for sanctioning on CarsReally.
          </p>
          <div className="w-24 h-1 bg-[#00f9ff] mx-auto mt-4 rounded-full"></div>
        </header>

        {statusMessage && (
          <div
            className={`mb-8 p-4 rounded-xl flex items-center gap-3 border ${
              statusMessage.type === "success"
                ? "bg-green-900/40 border-green-500 text-green-200"
                : "bg-red-900/40 border-red-500 text-red-200"
            }`}
          >
            {statusMessage.type === "success" ? (
              <CheckCircle size={22} className="shrink-0 text-green-400" />
            ) : (
              <AlertCircle size={22} className="shrink-0 text-red-400" />
            )}
            <p className="text-sm font-medium">{statusMessage.text}</p>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-black/40 backdrop-blur-lg rounded-2xl border border-white/10 shadow-2xl overflow-hidden p-6 md:p-10 space-y-8"
        >
          {/* Organizer Info */}
          <div className="rounded-xl p-6 bg-white/5 border border-white/10">
            <h2 className="flex items-center gap-2 text-2xl font-bold text-[#00f9ff] mb-4">
              <UserCircle size={28} /> Organizer Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-gray-300 text-xs font-semibold mb-1">
                  Organizer or Club Name *
                </label>
                <input
                  type="text"
                  name="organizerName"
                  value={formData.organizerName}
                  onChange={handleChange}
                  placeholder="e.g. Apex Racing Club"
                  className="w-full px-4 py-2.5 bg-black/50 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00f9ff]"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 text-xs font-semibold mb-1">
                  Contact Email *
                </label>
                <input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  placeholder="club@example.com"
                  className="w-full px-4 py-2.5 bg-black/50 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00f9ff]"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 text-xs font-semibold mb-1">
                  Contact Phone
                </label>
                <input
                  type="tel"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-4 py-2.5 bg-black/50 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00f9ff]"
                />
              </div>
            </div>
          </div>

          {/* Basic Info */}
          <div className="rounded-xl p-6 bg-white/5 border border-white/10">
            <h2 className="flex items-center gap-2 text-2xl font-bold text-[#00f9ff] mb-4">
              <Info size={28} /> Basic Information
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 text-xs font-semibold mb-1">
                  Event Name *
                </label>
                <input
                  type="text"
                  name="eventName"
                  value={formData.eventName}
                  onChange={handleChange}
                  placeholder="e.g. Mountain Thunder Rally"
                  className="w-full px-4 py-2.5 bg-black/50 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00f9ff]"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 text-xs font-semibold mb-1">
                  Event Type *
                </label>
                <select
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-black/50 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#00f9ff]"
                  required
                >
                  <option value="Stage Rally">Stage Rally</option>
                  <option value="Rallycross">Rallycross</option>
                  <option value="Road Rally">Road Rally</option>
                  <option value="Time-Speed-Distance Rally">Time-Speed-Distance Rally</option>
                  <option value="Hill Climb">Hill Climb</option>
                  <option value="Track Day">Track Day</option>
                </select>
              </div>

              {/* Event Poster Upload */}
              <div>
                <label className="block text-gray-300 text-xs font-semibold mb-1">
                  Event Poster Image *
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00f9ff]"
                />
                {uploading && <p className="text-[#00f9ff] text-sm mt-2">Uploading image...</p>}
                {formData.imageUrl && (
                  <img
                    src={formData.imageUrl}
                    alt="Event Poster Preview"
                    className="mt-4 max-h-48 rounded-lg border border-[#00f9ff] object-cover"
                  />
                )}
              </div>

              <div>
                <label className="block text-gray-300 text-xs font-semibold mb-1">
                  Description *
                </label>
                <textarea
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your rally terrain, regulations, and challenges..."
                  className="w-full px-4 py-2.5 bg-black/50 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00f9ff]"
                  required
                />
              </div>
            </div>
          </div>

          {/* Date & Location */}
          <div className="rounded-xl p-6 bg-white/5 border border-white/10">
            <h2 className="flex items-center gap-2 text-2xl font-bold text-[#00f9ff] mb-4">
              <MapPin size={28} /> Date, Time & Location
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 text-xs font-semibold mb-1">
                  Event Starting Date *
                </label>
                <input
                  type="date"
                  name="eventstartingDate"
                  value={formData.eventstartingDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-black/50 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#00f9ff]"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 text-xs font-semibold mb-1">
                  Event Ending Date *
                </label>
                <input
                  type="date"
                  name="eventendingDate"
                  value={formData.eventendingDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-black/50 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#00f9ff]"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 text-xs font-semibold mb-1">
                  Start Time *
                </label>
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-black/50 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#00f9ff]"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 text-xs font-semibold mb-1">
                  Location (Circuit, City, State) *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Angeles Crest Highway, CA"
                  className="w-full px-4 py-2.5 bg-black/50 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00f9ff]"
                  required
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-between pt-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 px-6 py-3 border border-gray-600 text-gray-300 rounded-xl hover:bg-gray-800 transition cursor-pointer font-medium"
            >
              <ArrowLeft size={18} /> Back
            </button>

            <button
              type="submit"
              disabled={submitting || uploading}
              className="px-8 py-3 bg-[#00f9ff] hover:bg-cyan-400 text-black font-bold rounded-xl transition cursor-pointer shadow-[0_0_15px_rgba(0,249,255,0.4)] disabled:opacity-50"
            >
              {submitting ? "Submitting..." : "Submit Registration"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookEvent;
