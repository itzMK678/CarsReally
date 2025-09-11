import React from "react";
import { UserCircle , Info ,MapPin } from "lucide-react";
const BookEvent = () => {
  return (
    <div className=" bg-gradient-to-r from-black to-blue-950  ">
      <div className="max-w-6xl py-10 pt-30 mx-auto px-4">
        
        <header className="text-center mb-10">
          <h1 className="racing-font text-4xl md:text-5xl text-[#00f9ff] mb-3">
            RALLY EVENT REGISTRATION
          </h1>
          <p className="text-xl text-gray-400">
            Register your rally racing event with our easy form
          </p>
          <div className="w-32 h-1 bg-[#00f9ff] mx-auto mt-4"></div>
        </header>

        {/* Form */}
        <form className="max-w-[1200px] bg- rounded-2xl border border-white/30 overflow-hidden ">


          
          <div className=" m-7 my-10 rounded-[8px] p-6 md:p-8 border hover:border-[#00f9ff] border-white/20">
            <h2 className="justify-center text-2xl md:text-3xl racing-font text-[#00f9ff] mb-6 flex items-center">
              <UserCircle size={35} className="mt-1 text-[#00f9ff] mr-3" /> Organizer Information
            </h2>
            <p className="text-center text-gray-400 mb-6">
              Contact details for event participants and inquiries.
            </p>

            <div className="space-y-5">
              <div>
                <p className="text-gray-400 mb-2">Organizer Name *</p>
                <input
                  type="text"
                  placeholder="Your name or organization"
                  className="w-full px-4 py-3 bg-transparent border border-white/10 rounded-lg text-[#00f9ff] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00f9ff]"
                  required
                />
              </div>

              <div>
                <p className="text-gray-400 mb-2">Contact Phone</p>
                <input
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  className="w-full px-4 py-3 bg-transparent border border-white/10 rounded-lg text-[#00f9ff] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00f9ff]"
                />
              </div>

              <div>
                <p className="text-gray-400 mb-2">Contact Email *</p>
                <input
                  type="email"
                  placeholder="contact@example.com"
                  className="w-full px-4 py-3 bg-transparent border border-white/10 rounded-lg text-[#00f9ff] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00f9ff]"
                  required
                />
              </div>
            </div>
          </div>

          {/* Section 2: Basic Info */}
          <div className="p-6 md:p-8  m-7 my-10 rounded-[8px] border hover:border-[#00f9ff] border-white/20">
            <h2 className="justify-center text-2xl md:text-3xl racing-font text-[#00f9ff] mb-6 flex items-center">
              < Info  size={35} className="mt-1 text-[#00f9ff] mr-3" />  Basic Information
            </h2>
            <p className="text-center text-gray-400 mb-6">
              Provide the essential details about your rally event.
            </p>

            <div className="space-y-5">
              <div>
                <p className="text-gray-400 mb-2">Event Name *</p>
                <input
                  type="text"
                  placeholder="e.g., Mountain Thunder Rally"
                  className="w-full px-4 py-3 bg-transparent border border-white/10 rounded-lg text-[#00f9ff] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00f9ff]"
                  required
                />
              </div>

              <div>
                <p className="text-gray-400 mb-2">Description *</p>
                <textarea
                  placeholder="Describe your rally event, terrain, challenges, and what participants can expect..."
                  className="w-full px-4 py-2 bg-transparent border border-white/10 rounded-lg text-[#00f9ff] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00f9ff]"
                  required
                ></textarea>
              </div>

              <div>
                <p className="text-gray-400 mb-2">Event Type *</p>
                <select className="w-full px-4 py-3 bg-transparent border border-white/10 rounded-lg text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00f9ff]">
                  <option className="bg-black text-gray-400">Select event type</option>
                  <option className="bg-black">Stage Rally</option>
                  <option className="bg-black">Rallycross</option>
                  <option className="bg-black">Road Rally</option>
                  <option className="bg-black">Time-Speed-Distance Rally</option>
                  <option className="bg-black">Hill Climb</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 3: Date, Time & Location */}
          <div className="p-6 md:p-8  m-7 my-10 rounded-[8px] border hover:border-[#00f9ff] border-white/20">
            <h2 className="justify-center text-2xl md:text-3xl racing-font text-[#00f9ff] mb-6 flex items-center">
              <MapPin size={35} className="mt-1 text-[#00f9ff] mr-3" />  Date, Time & Location
            </h2>
            <p className="text-center text-gray-400 mb-6">
              When and where will your rally event take place?
            </p>

            <div className="space-y-5">
              <div>
                <p className="text-gray-400 mb-2">Event Date *</p>
                <input
                  type="date"
                  className="w-full px-4 py-3 bg-transparent border border-white/10 rounded-lg text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00f9ff]"
                  required
                />
              </div>

              <div>
                <p className="text-gray-400 mb-2">Location *</p>
                <input
                  type="text"
                  placeholder="e.g., Rocky Mountains, Colorado"
                  className="w-full px-4 py-3 bg-transparent border border-white/10 rounded-lg text-[#00f9ff] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00f9ff]"
                  required
                />
              </div>

              <div>
                <p className="text-gray-400 mb-2">Start Time *</p>
                <input
                  type="time"
                  className="w-full px-4 py-3 bg-transparent border border-white/10 rounded-lg text-[#00f9ff] focus:outline-none focus:ring-2 focus:ring-[#00f9ff]"
                  required
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="p-6 md:p-8  flex justify-between">
            <button
              type="button"
              className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition"
            >
              <i className="fas fa-arrow-left mr-2"></i> Back
            </button>
            <button
              type="submit"
              className="px-6 py-3 cursor-pointer bg-[#00f9ff] text-black font-bold rounded-lg hover:bg-blue-500 transition"
            >
              Submit Registration <i className="fas fa-arrow-right ml-2"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookEvent;
