import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Services from "./pages/Services"
import Footer from "./components/Footer";
import BookEvent from "./pages/BookEvent";
import Homepage from "./pages/Homepage";
import AOS from "aos";
import "aos/dist/aos.css";
import Contact from "./pages/Contact";
import Events from "./pages/Events";
;

function App() {
  useEffect(() => {
     AOS.init({
      duration: 800, // animation duration in ms
      offset: 100,   // trigger offset
      once: true,    // animation runs only once
    });
  }, []);
  return (
    <>
      {/* ✅ Navbar should be outside Routes so it shows on all pages */}
      <Navbar />

      {/* ✅ Routes only contain Route components */}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/services" element={<Services />} />
        <Route path="/booking" element={<BookEvent />} />
        <Route path="/contact" element={<Contact />} />
 <Route path="/event" element={<Events />} />
      </Routes>

     
      <Footer />
    </>
  );
}

export default App;
