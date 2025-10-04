import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Homepage from "./pages/Homepage";
import Services from "./pages/Services";
import BookEvent from "./pages/BookEvent";
import Contact from "./pages/Contact";
import Events from "./pages/Events";
import Dashboard from '../src/admin/Dashboard'
import Details from "./components/Detail";
import ProtectedRoute from "./pages/ProtectedRoute";
import Login from "./auth/Login";
import AOS from "aos";
import "./i18n";
import "aos/dist/aos.css";

const Layout = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
);

function App() {
  useEffect(() => {
    AOS.init({ duration: 800, offset: 100, once: true });
  }, []);

  return (
    <Routes>
      <Route path="/login" />
      <Route path="/" element={<Layout><Homepage /></Layout>} />
      <Route path="/services" element={<Layout><Services /></Layout>} />
      <Route path="/booking" element={<Layout><BookEvent /></Layout>} />
      <Route path="/contact" element={<Layout><Contact /></Layout>} />
      <Route path="/event-details" element={<Layout><Details /></Layout>} />
      <Route path="/event" element={<Layout><Events /></Layout>} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
    </Routes>
  );
}

export default App;
