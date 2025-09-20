import {React,useState} from "react";
import HeroSection from "../components/HeroSection";
import PartnersSection from "../components/PatnersSection";
import ad from "../assets/advertisement.jpg";
import Event1 from "../assets/Event1.jpeg"
import Event2 from "../assets/Event2.jpeg"
import Event3 from "../assets/Event3.jpeg"
import BestEvents from "../components/home/BestEvents";
import UpcomingEvents from "../components/UpcomingEvents"
import { useEffect } from "react";
 
const Homepage = () => {

  const [events,setEvents]=useState([])
useEffect(() => {
  fetch("http://localhost:5000/getEvent")
    .then(res => res.json())
    .then(data => setEvents(data))
    .catch(err => console.error("❌ Error fetching events:", err));
}, []);

 return (
    <>
      <HeroSection />
      <PartnersSection />
      <BestEvents />

      <div
        className="w-screen h-[200px] bg-cover bg-center flex items-center justify-center relative"
        style={{ backgroundImage: `url(${ad})` }}
      ></div>

      <div className="py-20 bg-gradient-to-r from-black to-blue-950">
        <p className="text-center text-5xl font-bold text-white mb-4">
          Our <span className="text-[#00d3f3]">Up-coming</span> Events
        </p>
       {events.length === 0 ? (
  <p className="text-center text-white">No events found</p>
) : (
  events.map((event, index) => {
    const startDate = new Date(event.eventstartingDate);

    return (
      <UpcomingEvents
        key={index}
        imageUrl={event.imageUrl}
        eventName={event.eventName}
        year={startDate.getFullYear()}
        eventstartingDate={`${startDate.getDate()} ${startDate.toLocaleString("default", { month: "long" })}`}
        startTime={event.startTime}
        location={event.location}
        description={event.description}
      />
    );
  })
)}
      </div>
    </>
  );
};

export default Homepage;
