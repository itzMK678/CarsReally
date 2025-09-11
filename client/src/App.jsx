import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./components/home/BestEvents";
import Footer from "./components/Footer";
import BookEvent from "./pages/BookEvent";
import Homepage from "./pages/Homepage";

function App() {
  return (
    <>
      {/* ✅ Navbar should be outside Routes so it shows on all pages */}
      <Navbar />

      {/* ✅ Routes only contain Route components */}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/booking" element={<BookEvent />} />
      </Routes>

     
      <Footer />
    </>
  );
}

export default App;
