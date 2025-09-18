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

//     const events = [
//   {
//     title: "Night Drift Challenge", 
//     day:"22",
//     month:"September",
//     year:"2025",
//     time: "8:00 PM",
//     location: "Los Angeles, CA",
//     image: Event1,
//     description:
//       "An electrifying night of speed, adrenaline, and neon lights as top racers drift through the city streets.",
//   },
//   {
//     title: "Supercar Expo 2025",
//     day:"05",
//      year:"2025",
//      month:"Augest",
//     time: "10:00 AM",
//     location: "New York, NY",
//     image: Event2,
//     description:
//       "Experience the world's most luxurious supercars up close with live showcases, test drives, and networking opportunities.",
//   },
//   {
//     title: "Street Racing Fest",
//     day:"10",
//     month:"November",
//     time: "7:30 PM",
//      year:"2025",
//     location: "Miami, FL",
//     image: Event3,
//     description:
//       "Feel the heat of underground racing culture with fast cars, loud music, and unforgettable Miami vibes.",
//   },
// ];
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
          events.map((event, index) => <UpcomingEvents key={index} {...event} />)
        )}
      </div>
    </>
  );
};

export default Homepage;
