import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // for click events

import patner7 from "../../assets/patner8.jpg"; // fallback image

const ClientCalendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/getEvent")
      .then((res) => res.json())
      .then((data) => {
        // Map backend data to FullCalendar format
       const mappedEvents = data.map((event) => {
  // Safely parse start
  const start = new Date(event.eventstartingDate);
  const [hours, minutes] = event.startTime.split(":");
  start.setHours(parseInt(hours), parseInt(minutes));

  // Safely parse end
  const end = new Date(event.eventendingDate);
  end.setHours(parseInt(hours), parseInt(minutes));
  end.setDate(end.getDate() ); // include last day

  return {
    id: event._id,
    title: event.eventName,
    start,
    end,
    extendedProps: {
      
      badge: event.eventType,
      image: patner7, // fallback image
    },
  };
});

        setEvents(mappedEvents);
      })
      .catch((err) => console.error("❌ Error fetching events:", err));
  }, []);

  const renderEventContent = (eventInfo) => {
    const startTime = eventInfo.event.start
      ? eventInfo.event.start.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "";
    const endTime = eventInfo.event.end
      ? eventInfo.event.end.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "";

    return (
      <div className="flex items-start gap-2 p-2 rounded-lg bg-orange-200/50">
        {eventInfo.event.extendedProps.image && (
          <img
            src={eventInfo.event.extendedProps.image}
            alt={eventInfo.event.title}
            className="w-16 h-16 object-cover rounded"
          />
        )}
        <div className="flex flex-col">
          {eventInfo.event.extendedProps.badge && (
            <span className="text-xs font-bold bg-yellow-400 px-1 rounded">
              {eventInfo.event.extendedProps.badge}
            </span>
          )}
          <span className="font-bold">{eventInfo.event.title}</span>
          <span className="text-sm">
            {eventInfo.event.extendedProps.description}
          </span>
          <span className="text-xs font-mono">
            {startTime} – {endTime}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-black to-blue-950 text-white p-6">
      <h1 className="text-4xl font-bold text-center mb-6">Upcoming Events</h1>

      <div className="max-w-6xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl p-4 shadow-lg">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          eventContent={renderEventContent}
          height="auto"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "",
          }}
        />
      </div>
    </div>
  );
};

export default ClientCalendar;
