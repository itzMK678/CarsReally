import React, { useState } from "react";
import { X, CheckCircle } from "lucide-react";

const Participate = ({ onClose, eventName }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    age: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="relative bg-gray-900 border border-[#00F9FF]/40 rounded-2xl p-6 md:p-8 shadow-2xl text-white">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 p-1.5 rounded-full transition cursor-pointer"
        aria-label="Close"
      >
        <X size={20} />
      </button>

      {submitted ? (
        <div className="text-center py-6 space-y-4">
          <CheckCircle className="text-[#00F9FF] mx-auto w-16 h-16 animate-bounce" />
          <h3 className="text-2xl font-bold text-white">Registration Confirmed!</h3>
          <p className="text-gray-300">
            Thank you, <span className="text-[#00F9FF] font-semibold">{formData.name}</span>!
            Your entry for <span className="text-[#00F9FF] font-semibold">{eventName || "the event"}</span> has been registered.
          </p>
          <button
            onClick={onClose}
            className="mt-4 px-6 py-2 bg-[#00F9FF] text-black font-semibold rounded-lg hover:bg-cyan-400 transition cursor-pointer"
          >
            Done
          </button>
        </div>
      ) : (
        <>
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white">
              Join <span className="text-[#00F9FF]">{eventName || "Event"}</span>
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              Submit your racer or spectator registration
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-300 text-xs font-medium mb-1">Full Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. John Doe"
                required
                className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#00F9FF]"
              />
            </div>

            <div>
              <label className="block text-gray-300 text-xs font-medium mb-1">Email Address *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                required
                className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#00F9FF]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-gray-300 text-xs font-medium mb-1">Gender *</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#00F9FF]"
                >
                  <option value="">Select...</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 text-xs font-medium mb-1">Age *</label>
                <input
                  type="number"
                  name="age"
                  min="16"
                  max="99"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="18+"
                  required
                  className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#00F9FF]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-3 bg-[#00F9FF] hover:bg-cyan-400 text-black font-bold rounded-lg transition cursor-pointer shadow-[0_0_10px_rgba(0,249,255,0.3)]"
            >
              Confirm Participation
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default Participate;
