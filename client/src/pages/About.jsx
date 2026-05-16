import React from "react";
import {
  FaHotel,
  FaUsers,
  FaConciergeBell,
  FaStar,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-red-900 to-red-800 text-white py-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">About Our Hotel</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-200">
            Experience luxury, comfort, and unforgettable hospitality at our
            premium hotel booking platform.
          </p>
        </div>
      </div>

      {/* About Content */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <img
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop"
            alt="Hotel"
            className="rounded-3xl shadow-2xl w-full h-[450px] object-cover"
          />
        </div>

        <div>
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Welcome to StayEase
          </h2>

          <p className="text-gray-600 text-lg leading-8 mb-6">
            StayEase is designed to make hotel booking simple, secure, and
            enjoyable. We connect travelers with the best hotels around the
            world, offering luxurious rooms, affordable stays, and premium
            services.
          </p>

          <p className="text-gray-600 text-lg leading-8 mb-6">
            Whether you're planning a vacation, business trip, or weekend
            getaway, our platform ensures a seamless booking experience with
            trusted hotels and top-class customer support.
          </p>

          <Link to="/rooms">
              <button className="bg-red-700 hover:bg-red-800 text-white px-6 py-3 rounded-xl font-semibold transition duration-300 shadow-lg">
                  Explore Rooms
              </button>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-12">
            Why Choose Us?
          </h2>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-gray-50 p-8 rounded-2xl shadow-md hover:shadow-xl transition">
              <FaHotel className="text-5xl text-red-700 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Luxury Hotels</h3>
              <p className="text-gray-600">
                Discover top-rated hotels with world-class amenities.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl shadow-md hover:shadow-xl transition">
              <FaUsers className="text-5xl text-red-700 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Trusted by Guests</h3>
              <p className="text-gray-600">
                Thousands of happy travelers book with us every day.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl shadow-md hover:shadow-xl transition">
              <FaConciergeBell className="text-5xl text-red-700 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">24/7 Service</h3>
              <p className="text-gray-600">
                Dedicated support available anytime you need assistance.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl shadow-md hover:shadow-xl transition">
              <FaStar className="text-5xl text-red-700 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Best Experience</h3>
              <p className="text-gray-600">
                Enjoy a smooth and memorable booking experience.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="bg-red-900 text-white py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 text-center">
          <div>
            <h2 className="text-5xl font-bold">500+</h2>
            <p className="mt-3 text-lg text-gray-300">Hotels Available</p>
          </div>

          <div>
            <h2 className="text-5xl font-bold">10K+</h2>
            <p className="mt-3 text-lg text-gray-300">Happy Guests</p>
          </div>

          <div>
            <h2 className="text-5xl font-bold">24/7</h2>
            <p className="mt-3 text-lg text-gray-300">Customer Support</p>
          </div>

          <div>
            <h2 className="text-5xl font-bold">4.9★</h2>
            <p className="mt-3 text-lg text-gray-300">Average Rating</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default About;