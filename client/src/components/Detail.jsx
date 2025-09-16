import { useLocation, useNavigate } from "react-router-dom";
import Participate from "../components/event/Participate";
import { useState } from "react";

const Details = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const { state } = useLocation();

  if (!state) {
    navigate("/");
    return null;
  }

  const { image, title, year, day, month, time, location, description } = state;

  return (
    <main className="min-h-screen bg-gradient-to-r from-black to-blue-950 text-white py-10 px-6">
      <article className="max-w-6xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg overflow-hidden relative">
        {/* Event image */}
        <div className="relative mt-10">
  <img
    src={image}
    alt={title}
    className="w-full object-contain max-h-[80vh] rounded-t-2xl"
  />
  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
    <h1 className="text-4xl md:text-5xl font-bold text-white px-6 pb-6">
      {title}
    </h1>
  </div>
</div>


        {/* Event Details */}
        <p className="p-6 pb-1">
          Event will be held at{" "}
          <span className="text-[#00F9FF]">
            {month} {day}, {year}
          </span>
        </p>
        <p className="p-6 py-1">
          On <span className="text-[#00F9FF]">{location}</span> at{" "}
          <span className="text-[#00F9FF]">{time}</span>
        </p>

        <p className="p-6 py-3">
          <span className="font-bold">Description: </span>
          {description}
        </p>

        {/* Button to toggle participate form */}
        <button
          className="h-[50px] font-bold text-[25px] bg-[#00d0ff] min-w-[300px] m-6 rounded-[8px] hover:bg-gradient-to-r from-purple-600 to-indigo-600 cursor-pointer"
          onClick={() => setVisible((prev) => !prev)}
        >
          Participate
        </button>

        {/* Participate Form (conditionally visible) */}
        <div
          className={`absolute top-40 right-2 transition-all duration-300 ${
            visible ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"
          }`}
        >
          <Participate />
        </div>
      </article>
    </main>
  );
};

export default Details;
