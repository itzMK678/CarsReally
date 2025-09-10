import React from "react";

const BookEvent = () => {
  return (
    <div className="text-gray-200 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <header className="text-center mb-10">
          <h1 className="racing-font text-4xl md:text-5xl text-yellow-500 mb-3">
            RALLY EVENT REGISTRATION
          </h1>
          <p className="text-xl text-gray-400">
            Register your rally racing event with our easy form
          </p>
          <div className="w-32 h-1 bg-yellow-500 mx-auto mt-4"></div>
        </header>

        {/* Progress Bar */}
        <div className="mb-12 bg-gray-800 rounded-full h-2.5 mx-4">
          <div className="bg-yellow-500 h-2.5 rounded-full w-1/3"></div>
        </div>

        {/* Form Container */}
        <form className="bg-gray-900 rounded-xl shadow-2xl overflow-hidden border border-gray-700">
          {/* Section 1: Organizer Information */}
          <div className="form-section p-6 md:p-8 border-b border-gray-700">
            <h2 className="text-2xl md:text-3xl racing-font text-yellow-500 mb-6 flex items-center">
              <i className="fas fa-user-circle mr-3"></i> Organizer Information
            </h2>
            <p className="text-gray-400 mb-6">
              Contact details for event participants and inquiries.
            </p>

            <div className="space-y-6">
              <div>
                <label className="block text-gray-400 mb-2">
                  Organizer Name *
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Your name or organization"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  Your name or organization
                </p>
              </div>

              <div>
                <label className="block text-gray-400 mb-2">
                  Contact Phone (Optional)
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-2">
                  Contact Email *
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="contact@example.com"
                  required
                />
              </div>
            </div>
          </div>

          {/* Section 2: Basic Information */}
          <div className="form-section p-6 md:p-8 border-b border-gray-700">
            <h2 className="text-2xl md:text-3xl racing-font text-yellow-500 mb-6 flex items-center">
              <i className="fas fa-info-circle mr-3"></i> Basic Information
            </h2>
            <p className="text-gray-400 mb-6">
              Provide the essential details about your rally event.
            </p>

            <div className="space-y-6">
              <div>
                <label className="block text-gray-400 mb-2">Event Name *</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="e.g., Mountain Thunder Rally"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-2">Description *</label>
                <textarea
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 h-32"
                  placeholder="Describe your rally event, terrain, challenges, and what participants can expect..."
                  required
                ></textarea>
              </div>

              <div>
                <label className="block text-gray-400 mb-2">Event Type *</label>
                <select className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500">
                  <option>Select event type</option>
                  <option>Stage Rally</option>
                  <option>Rallycross</option>
                  <option>Road Rally</option>
                  <option>Time-Speed-Distance Rally</option>
                  <option>Hill Climb</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 3: Date, Time & Location */}
          <div className="form-section p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl racing-font text-yellow-500 mb-6 flex items-center">
              <i className="fas fa-map-marker-alt mr-3"></i> Date, Time & Location
            </h2>
            <p className="text-gray-400 mb-6">
              When and where will your rally event take place?
            </p>

            <div className="space-y-6">
              <div>
                <label className="block text-gray-400 mb-2">Event Date *</label>
                <input
                  type="date"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">mm/dd/yyyy</p>
              </div>

              <div>
                <label className="block text-gray-400 mb-2">Location *</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="e.g., Rocky Mountains, Colorado"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-2">Start Time *</label>
                <input
                  type="time"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="p-6 md:p-8 bg-gray-800 flex justify-between">
            <button
              type="button"
              className="px-6 py-3 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition"
            >
              <i className="fas fa-arrow-left mr-2"></i> Back
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-yellow-600 text-gray-900 font-bold rounded-lg hover:bg-yellow-500 transition"
            >
              Submit Registration <i className="fas fa-arrow-right ml-2"></i>
            </button>
          </div>
        </form>

        {/* Footer */}
        <footer className="text-center mt-12 text-gray-500">
          <p>© 2023 RallyEvent Organizer. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default BookEvent;
