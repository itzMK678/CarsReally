import React from "react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className=" bg-black text-white pt-10 border-t border-[#00F9FF]/40">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
        {/* Logo / Brand */}
        <div>
          <h2 className="text-3xl font-bold text-[#00F9FF] drop-shadow-[0_0_10px_#00F9FF]">
            CarsReally
          </h2>
          <p className="text-white/70 mt-2">
            Discover the best automotive events in your area.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col space-y-2">
          <h3 className="text-xl font-semibold text-[#00F9FF]">Quick Links</h3>
          <a
            href="#"
            className="hover:text-[#00F9FF] transition duration-300"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="hover:text-[#00F9FF] transition duration-300"
          >
            Cookies Policy
          </a>
          <a
            href="#"
            className="hover:text-[#00F9FF] transition duration-300"
          >
            FAQs
          </a>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold text-[#00F9FF]">Follow Us</h3>
          <div className="flex space-x-4 mt-3">
            <a
              href="#"
              className="p-2 rounded-full border border-[#00F9FF]/50 hover:bg-[#00F9FF]/20 hover:shadow-[0_0_10px_#00F9FF] transition"
            >
              <Facebook className="w-5 h-5 text-[#00F9FF]" />
            </a>
            <a
              href="#"
              className="p-2 rounded-full border border-[#00F9FF]/50 hover:bg-[#00F9FF]/20 hover:shadow-[0_0_10px_#00F9FF] transition"
            >
              <Twitter className="w-5 h-5 text-[#00F9FF]" />
            </a>
            <a
              href="#"
              className="p-2 rounded-full border border-[#00F9FF]/50 hover:bg-[#00F9FF]/20 hover:shadow-[0_0_10px_#00F9FF] transition"
            >
              <Instagram className="w-5 h-5 text-[#00F9FF]" />
            </a>
            <a
              href="#"
              className="p-2 rounded-full border border-[#00F9FF]/50 hover:bg-[#00F9FF]/20 hover:shadow-[0_0_10px_#00F9FF] transition"
            >
              <Linkedin className="w-5 h-5 text-[#00F9FF]" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="text-center mt-5 border-t border-[#00F9FF]/30 pt-2 text-white/60">
        <p>© {new Date().getFullYear()} CarsReally. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
