import React, { useState } from "react";
import { UserCircle, Info, MapPin } from "lucide-react";

const BookEvent = () => {
  const [formData, setFormData] = useState({
    organizerName: "",
    contactPhone: "",
    contactEmail: "",
    eventName: "",
    description: "",
    eventType: "",
    eventstartingDate: "", // lowercase, matches backend
    eventendingDate: "",
    location: "",
    startTime: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          // Convert date strings to Date objects
          eventstartingDate: new Date(formData.eventstartingDate),
          eventendingDate: new Date(formData.eventendingDate),
        }),
      });

      const data = await res.text();
      alert(data);

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
      });
    } catch (err) {
      console.error("❌ Error:", err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="bg-gradient-to-r from-black to-blue-950 min-h-screen">
      <div className="max-w-6xl py-10 mx-auto px-4">
        <header className="text-center mb-10">
          <h1 className="racing-font text-4xl md:text-5xl text-[#00f9ff] mb-3">
            RALLY EVENT REGISTRATION
          </h1>
          <p className="text-xl text-gray-400">
            Register your rally racing event with our easy form
          </p>
          <div className="w-32 h-1 bg-[#00f9ff] mx-auto mt-4"></div>
        </header>

        <form
          onSubmit={handleSubmit}
          className="max-w-[1200px] rounded-2xl border border-white/30 overflow-hidden"
        >
          {/* Organizer Info */}
          <div className="m-7 my-10 rounded-[8px] p-6 md:p-8 border hover:border-[#00f9ff] border-white/20">
            <h2 className="flex items-center justify-center text-2xl md:text-3xl racing-font text-[#00f9ff] mb-6">
              <UserCircle size={35} className="mt-1 mr-3" /> Organizer Information
            </h2>
            <p className="text-center text-gray-400 mb-6">
              Contact details for event participants and inquiries.
            </p>

            <div className="space-y-5">
              <div>
                <p className="text-gray-400 mb-2">Organizer Name *</p>
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

              <div>
                <p className="text-gray-400 mb-2">Contact Phone</p>
                <input
                  type="tel"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleChange}
                  placeholder="+1 (555) 123-4567"
                  className="w-full px-4 py-3 bg-transparent border border-white/10 rounded-lg text-[#00f9ff] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00f9ff]"
                />
              </div>

              <div>
                <p className="text-gray-400 mb-2">Contact Email *</p>
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
              <Info size={35} className="mt-1 mr-3" /> Basic Information
            </h2>
            <p className="text-center text-gray-400 mb-6">
              Provide the essential details about your rally event.
            </p>

            <div className="space-y-5">
              <div>
                <p className="text-gray-400 mb-2">Event Name *</p>
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

              <div>
                <p className="text-gray-400 mb-2">Description *</p>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your rally event, terrain, challenges..."
                  className="w-full px-4 py-2 bg-transparent border border-white/10 rounded-lg text-[#00f9ff] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00f9ff]"
                  required
                />
              </div>

              <div>
                <p className="text-gray-400 mb-2">Event Type *</p>
                <select
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-transparent border border-white/10 rounded-lg text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00f9ff]"
                  required
                >
                  <option value="">Select event type</option>
                  <option>Stage Rally</option>
                  <option>Rallycross</option>
                  <option>Road Rally</option>
                  <option>Time-Speed-Distance Rally</option>
                  <option>Hill Climb</option>
                </select>
              </div>
            </div>
          </div>

          {/* Date, Time & Location */}
          <div className="p-6 md:p-8 m-7 my-10 rounded-[8px] border hover:border-[#00f9ff] border-white/20">
            <h2 className="flex items-center justify-center text-2xl md:text-3xl racing-font text-[#00f9ff] mb-6">
              <MapPin size={35} className="mt-1 mr-3" /> Date, Time & Location
            </h2>
            <p className="text-center text-gray-400 mb-6">
              When and where will your rally event take place?
            </p>

            <div className="space-y-5">
              <div>
                <p className="text-gray-400 mb-2">Event Starting Date *</p>
                <input
                  type="date"
                  name="eventstartingDate"
                  value={formData.eventstartingDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-transparent border border-white/10 rounded-lg text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00f9ff]"
                  required
                />
              </div>

              <div>
                <p className="text-gray-400 mb-2">Event Ending Date *</p>
                <input
                  type="date"
                  name="eventendingDate"
                  value={formData.eventendingDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-transparent border border-white/10 rounded-lg text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00f9ff]"
                  required
                />
              </div>

              <div>
                <p className="text-gray-400 mb-2">Location *</p>
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

              <div>
                <p className="text-gray-400 mb-2">Start Time *</p>
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
              className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition"
            >
              Back
            </button>
            <button
              type="submit"
              className="px-6 py-3 cursor-pointer bg-[#00f9ff] text-black font-bold rounded-lg hover:bg-blue-500 transition"
            >
              Submit Registration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookEvent;
