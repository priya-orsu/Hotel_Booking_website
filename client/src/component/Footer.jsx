import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-200 py-10">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">VS Hotels</h2>
          <p className="text-sm text-gray-400">
            Your go-to platform for finding the best hotel deals and seamless bookings.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/hotels" className="hover:underline">Hotels</a></li>
            <li><a href="/rooms" className="hover:underline">Rooms</a></li>
            <li><a href="/about" className="hover:underline">About</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Connect With Us</h3>
          <div className="flex gap-4 mt-2 text-xl">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-blue-500"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-pink-500"
            >
              <FaInstagram />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="hover:text-blue-400"
            >
              <FaTwitter />
            </a>
            <a
              href="https://wa.me/919999999999" // Replace with your actual number
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="hover:text-green-400"
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-gray-500 text-sm mt-10 border-t pt-4 border-gray-700">
        &copy; VS Hotel 2025. 
      </div>
    </footer>
  );
};

export default Footer;
