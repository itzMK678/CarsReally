import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import partner7 from "../../assets/patner8.jpg";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const FALLBACK_CALENDAR_EVENTS = [
  {
    _id: "cal-1",
    eventName: "Monte Carlo Style Rally",
    eventstartingDate: "2026-10-15",
    eventendingDate: "2026-10-16",
    startTime: "10:00",
    eventType: "Stage Rally",
  },
  {
    _id: "cal-2",
    eventName: "Vintage Classic Grand Prix",
    eventstartingDate: "2026-11-20",
    eventendingDate: "2026-11-21",
    startTime: "14:00",
    eventType: "Hill Climb",
  },
];

const parseEventDateTime = (dateVal, timeVal) => {
  const d = new Date(dateVal);
  if (isNaN(d.getTime())) return new Date();

  if (timeVal && typeof timeVal === "string") {
    const match = timeVal.match(/(\d{1,2}):(\d{2})/);
    if (match) {
      d.setHours(parseInt(match[1], 10), parseInt(match[2], 10), 0);
    }
  }
  return d;
};

const ClientCalendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/getEvent`)
      .then((res) => {
        if (!res.ok) throw new Error("Could not fetch events");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          mapAndSetEvents(data);
        } else {
          mapAndSetEvents(FALLBACK_CALENDAR_EVENTS);
        }
      })
      .catch((err) => {
        console.warn("Backend not available, using offline calendar events:", err.message);
        mapAndSetEvents(FALLBACK_CALENDAR_EVENTS);
      });
  }, []);

  const mapAndSetEvents = (data) => {
    const mapped = data.map((event) => {
      const start = parseEventDateTime(event.eventstartingDate, event.startTime);
      const end = parseEventDateTime(event.eventendingDate || event.eventstartingDate, event.startTime);
      // Ensure end includes day
      end.setDate(end.getDate() + 1);

      return {
        id: event._id,
        title: event.eventName || event.title || "Rally Event",
        start,
        end,
        extendedProps: {
          badge: event.eventType || "Motorsport",
          image: event.imageUrl || partner7,
          description: event.description || "",
        },
      };
    });
    setEvents(mapped);
  };

  const renderEventContent = (eventInfo) => {
    const startTime = eventInfo.event.start
      ? eventInfo.event.start.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "";

    return (
      <div className="flex items-start gap-2 p-2 rounded-lg bg-gray-900/90 text-white border border-[#00F9FF]/40 text-xs w-full overflow-hidden">
        {eventInfo.event.extendedProps.image && (
          <img
            src={eventInfo.event.extendedProps.image}
            alt={eventInfo.event.title}
            className="w-10 h-10 object-cover rounded shrink-0"
          />
        )}
        <div className="flex flex-col min-w-0">
          {eventInfo.event.extendedProps.badge && (
            <span className="text-[10px] font-bold text-black bg-[#00F9FF] px-1.5 py-0.5 rounded w-fit mb-0.5">
              {eventInfo.event.extendedProps.badge}
            </span>
          )}
          <span className="font-semibold truncate">{eventInfo.event.title}</span>
          {startTime && <span className="text-gray-400 text-[10px]">{startTime}</span>}
        </div>
      </div>
    );
  };

  return (
    <div className="text-white p-2 md:p-6">
      <div className="max-w-6xl mx-auto bg-black/40 backdrop-blur-lg rounded-2xl p-4 md:p-6 border border-white/10 shadow-2xl">
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
