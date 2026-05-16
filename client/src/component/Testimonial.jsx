import React from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "John Doe",
    role: "Traveler",
    comment:
      "Fantastic service and very easy to book! The hotel was exactly as described.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
  },
  {
    name: "Sophia Lee",
    role: "Businesswoman",
    comment:
      "Very user-friendly experience and excellent customer support. Will use again!",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    rating: 4,
  },
  {
    name: "Carlos Diaz",
    role: "Tourist",
    comment:
      "Loved the quick booking process. Hotels were top-notch and affordable.",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    rating: 4,
  },
];

const Testimonial = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-10 text-gray-800">
          What Our Customers Say
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div className="text-left">
                  <h4 className="font-semibold text-gray-700">{t.name}</h4>
                  <span className="text-sm text-gray-500">{t.role}</span>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-4">"{t.comment}"</p>
              <div className="flex justify-start">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={18} className="text-yellow-500 fill-yellow-500" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
