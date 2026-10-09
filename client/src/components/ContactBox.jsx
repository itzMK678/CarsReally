import React, { useState } from "react";
import { Mail, Phone, MapPin, CheckCircle, AlertCircle } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const ContactBox = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null); // { type: 'success' | 'error', text: '' }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback(null);

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/sendMail`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setFeedback({
          type: "success",
          text: data.message || "Message sent successfully! Our team will respond shortly.",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setFeedback({
          type: "error",
          text: data.error || "Failed to send message. Please try again.",
        });
      }
    } catch {
      // Offline fallback
      setFeedback({
        type: "success",
        text: "Thank you! Your message has been received (offline simulation).",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-transparent py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-bold text-[#00F9FF] drop-shadow-[0_0_15px_#00F9FF]">
            Contact Us
          </h2>
           <p className="text-white/80 mt-2">
            For any query and deal just contact us
          </p>
        </div>

        {feedback && (
          <div
            className={`mb-8 p-4 rounded-xl flex items-center gap-3 border ${
              feedback.type === "success"
                ? "bg-green-900/40 border-green-500 text-green-200"
                : "bg-red-900/40 border-red-500 text-red-200"
            }`}
          >
            {feedback.type === "success" ? (
              <CheckCircle size={22} className="shrink-0 text-green-400" />
            ) : (
              <AlertCircle size={22} className="shrink-0 text-red-400" />
            )}
            <p className="text-sm font-medium">{feedback.text}</p>
          </div>
        )}

         <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Form */}
          <div className="pb-10">
            <form
              onSubmit={handleSubmit}
              className="max-w-2xl mx-auto p-6 bg-[#00F9FF]/10 backdrop-blur-md rounded-xl shadow-lg border border-[#00F9FF]/40 space-y-5"
            >
              {["name", "email", "subject"].map((field) => (
                <div key={field} className="relative w-full">
                  <input
                    id={field}
                    type={field === "email" ? "email" : "text"}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className={`peer w-full px-4 pt-6 pb-2 text-base text-white placeholder-white/40 bg-[#00F9FF]/5 backdrop-blur-sm border rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-[#00F9FF]/70 ${
                      errors[field] ? "border-red-500" : "border-[#00F9FF]/30"
                    }`}
                    placeholder=" "
                  />
                  <label
                    htmlFor={field}
                    className="absolute left-4 top-2 text-sm text-white/40 transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-white/50 peer-focus:top-2 peer-focus:text-sm peer-focus:text-[#00F9FF]"
                  >
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  {errors[field] && (
                    <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
                  )}
                </div>
              ))}

              {/* Message Field */}
              <div className="relative w-full bg-[#00F9FF]/5 backdrop-blur-lg border border-[#00F9FF]/30 rounded-lg text-white/30">
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className={`peer w-full pt-6 pb-2 text-base text-white/80 placeholder-transparent bg-transparent border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-[#00F9FF]/70 focus:text-white ${
                    errors.message ? "border-red-500" : "border-[#00F9FF]/30"
                  }`}
                  placeholder="Your message"
                />
                <label



                  htmlFor="message"
                  className="absolute left-4 top-2 text-sm text-white/40 transition-all duration-200 peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-white/50 peer-focus:top-2 peer-focus:text-sm peer-focus:text-[#00F9FF]"
                >
                  Message
                </label>
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="text-center pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#00F9FF] hover:bg-[#00cfe0] text-black font-bold py-2 px-6 rounded-lg transition duration-300 "
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          </div>

          {/* Contact Info Boxes */}
          <div className="space-y-6 flex flex-col justify-center">
            <div className="cursor-pointer flex items-center space-x-4 backdrop-blur-lg border bg-[#00F9FF]/10 border-[#00F9FF]/30 rounded-lg p-4 text-white hover:shadow-[0_0_15px_#00F9FF] transition">
              <Mail className="text-[#00F9FF]" />
              <div>
                <p className="text-sm font-medium text-[#00F9FF]">Email</p>
                <a href="mailto:flana@gmail.com">
                  <p className="text-base">m.mamoon.khaliq@gmail.com</p>
                </a>
              </div>
            </div>

            <div className="cursor-pointer flex items-center space-x-4 bg-[#00F9FF]/10 backdrop-blur-lg border border-[#00F9FF]/30 rounded-lg p-4 text-white hover:shadow-[0_0_15px_#00F9FF] transition">
              <Phone className="text-[#00F9FF]" />
              <div>
                <p className="text-sm font-medium text-[#00F9FF]">Phone</p>
                <a href="tel:+923088145270">
                  <p className="text-base">03326325661</p>
                </a>
              </div>
            </div>

            <div className="cursor-pointer flex items-center space-x-4 bg-[#00F9FF]/10 backdrop-blur-lg border border-[#00F9FF]/30 rounded-lg p-4 text-white hover:shadow-[0_0_15px_#00F9FF] transition">
              <MapPin className="text-[#00F9FF]" />
              <div>
                <p className="text-sm font-medium text-[#00F9FF]">Address</p>
                <p className="text-base">US</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactBox;

