import { useLocation, useNavigate, Link } from "react-router-dom";
import Participate from "../components/event/Participate";
import { useState } from "react";
import { ArrowLeft, Calendar, Clock, MapPin } from "lucide-react";

const Details = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const { state } = useLocation();

  if (!state) {
    return (
      <main className="min-h-screen bg-gradient-to-r from-black to-blue-950 text-white flex flex-col items-center justify-center p-6">
        <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl max-w-md text-center border border-white/20">
          <h2 className="text-2xl font-bold mb-4 text-[#00F9FF]">No Event Selected</h2>
          <p className="text-gray-300 mb-6">
            Please choose an event from our events page to view its details.
          </p>
          <Link
            to="/event"
            className="px-6 py-2.5 bg-[#00F9FF] text-black font-semibold rounded-lg hover:bg-cyan-400 transition"
          >
            Browse Events
          </Link>
        </div>
      </main>
    );
  }

  const image =
    state.imageUrl ||
    state.image ||
    "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800";
  const title = state.eventName || state.title || "Motorsport Event";
  const dateStr =
    state.eventstartingDate ||
    (state.month && state.day ? `${state.day} ${state.month}` : "Upcoming");
  const yearStr = state.year || new Date().getFullYear();
  const timeStr = state.startTime || state.time || "TBA";
  const locationStr = state.location || "TBD";
  const descriptionStr = state.description || "No description available.";
  const eventTypeStr = state.eventType || "Motorsport Rally";

  return (
    <main className="min-h-screen bg-gradient-to-r from-black to-blue-950 text-white pt-24 pb-16 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Back Link */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#00F9FF] hover:underline mb-6 cursor-pointer font-medium"
        >
          <ArrowLeft size={20} /> Back to Events
        </button>

        <article className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 overflow-hidden relative">
          {/* Event Image Banner */}
          <div className="relative w-full h-[350px] md:h-[450px]">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6 md:p-10">
              <span className="w-fit text-xs font-bold uppercase tracking-wider bg-[#00F9FF] text-black px-3 py-1 rounded-full mb-3">
                {eventTypeStr}
              </span>
              <h1 className="text-3xl md:text-5xl font-extrabold text-white">
                {title}
              </h1>
            </div>
          </div>

          {/* Event Details Content */}
          <div className="p-6 md:p-10 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-6 border-b border-white/10">
              <div className="flex items-center gap-3 bg-black/40 p-4 rounded-xl border border-white/10">
                <Calendar className="text-[#00F9FF]" size={24} />
                <div>
                  <p className="text-xs text-gray-400">Date</p>
                  <p className="font-semibold text-white">
                    {dateStr}, {yearStr}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-black/40 p-4 rounded-xl border border-white/10">
                <Clock className="text-[#00F9FF]" size={24} />
                <div>
                  <p className="text-xs text-gray-400">Time</p>
                  <p className="font-semibold text-white">{timeStr}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-black/40 p-4 rounded-xl border border-white/10">
                <MapPin className="text-[#00F9FF]" size={24} />
                <div>
                  <p className="text-xs text-gray-400">Location</p>
                  <p className="font-semibold text-white">{locationStr}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-[#00F9FF] mb-2">About the Event</h3>
              <p className="text-gray-300 leading-relaxed text-base md:text-lg">
                {descriptionStr}
              </p>
            </div>

            {/* Participate Action */}
            <div className="pt-4">
              <button
                className="px-8 py-3.5 font-bold text-lg bg-[#00F9FF] hover:bg-cyan-400 text-black rounded-xl transition cursor-pointer shadow-[0_0_15px_rgba(0,249,255,0.4)]"
                onClick={() => setVisible(true)}
              >
                Participate in This Event
              </button>
            </div>
          </div>

          {/* Modal / Overlay for Participate Form */}
          {visible && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
              <div className="relative w-full max-w-md">
                <Participate onClose={() => setVisible(false)} eventName={title} />
              </div>
            </div>
          )}
        </article>
      </div>
    </main>
  );
};

export default Details;
