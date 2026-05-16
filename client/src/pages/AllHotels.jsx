import { FiStar, FiMapPin, FiWifi, FiCoffee, FiDroplet, FiTv} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const AllHotels = ({ hotel }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate('/rooms');
  };
  return (
    <div className="bg-white mt-10 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="relative h-48 overflow-hidden">
        <img
          src={hotel.image}
          alt={hotel.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-md shadow-sm flex items-center">
          <FiStar className="text-yellow-400 mr-1" />
          <span className="font-medium">{hotel.rating}</span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold text-gray-800">{hotel.name}</h3>
            <div className="flex items-center text-gray-600 mt-1">
              <FiMapPin className="mr-1" size={14} />
              <span className="text-sm">{hotel.location}</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold text-red-600">₹{hotel.originalPrice}</p>
            <p className="text-xs text-gray-500">per night</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {hotel.amenities.map((amenity, index) => (
            <div key={index} className="flex items-center text-xs bg-gray-100 px-2 py-1 rounded">
              {amenity.icon}
              <span className="ml-1">{amenity.name}</span>
            </div>
          ))}
        </div>
        <button onClick={handleViewDetails} className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md transition-colors duration-200 font-medium">
          View Details
        </button>
      </div>
    </div>
  );
};

const HotelCardsGrid = () => {
  const hotels = [
    {
      id: 1,
      name: "Grand Hotel",
      location: "Vizag, India",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      originalPrice: 3999,
      amenities: [
        { name: "Free WiFi", icon: <FiWifi size={14} /> },
        { name: "Breakfast", icon: <FiCoffee size={14} /> },
        { name: "Pool", icon: <FiDroplet size={14} /> },
        { name: "TV", icon: <FiTv size={14} /> }
      ]
    },
    {
      id: 2,
      name: "Beach Resort & Spa",
      location: "Goa, India",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      originalPrice: 5999,
      amenities: [
        { name: "Free WiFi", icon: <FiWifi size={14} /> },
        { name: "Spa", icon: <FiDroplet size={14} /> },
        { name: "Pool", icon: <FiDroplet size={14} /> },
        { name: "Breakfast", icon: <FiCoffee size={14} /> }
      ]
    },
    {
      id: 3,
      name: "Mountain View Lodge",
      location: "Maredumilli, India",
      rating: 4.7,
      image: "https://images.trvl-media.com/lodging/33000000/32190000/32187000/32186983/6a51a6f3.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill",
      originalPrice: 2499,
      amenities: [
        { name: "Free WiFi", icon: <FiWifi size={14} /> },
        { name: "Restaurant", icon: <FiCoffee size={14} /> },
        { name: "TV", icon: <FiTv size={14} /> }
      ]
    },
    {
      id: 4,
      name: "City Center Suites",
      location: "Delhi, India",
      rating: 4.5,
      image: "https://imkarchitects.com/images/projects/business-hotel/taj-krishna/2.jpg",
      originalPrice: 2299,
      amenities: [
        { name: "Free WiFi", icon: <FiWifi size={14} /> },
        { name: "Breakfast", icon: <FiCoffee size={14} /> },
        { name: "Gym", icon: <FiDroplet size={14} /> }
      ]
    },
    {
      id: 5,
      name: "Luxury Beach Resort",
      location: "pondicherry, India",
      rating: 4.9,
      image: "https://static1.squarespace.com/static/66dc2b49a78a2f161738aa35/t/67cf1a9f585dd2264330a198/1741626015384/DJI_0174-3sm.jpg?format=1500w",
      originalPrice: 8999,
      amenities: [
        { name: "Free WiFi", icon: <FiWifi size={14} /> },
        { name: "Spa", icon: <FiDroplet size={14} /> },
        { name: "Pool", icon: <FiDroplet size={14} /> },
        { name: "Breakfast", icon: <FiCoffee size={14} /> }
    ]
    },
    {
      id: 6,
      name: "view point",
      location: "Kerala, India",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      originalPrice: 6500,
      amenities: [
        { name: "Free WiFi", icon: <FiWifi size={14} /> },
        { name: "Breakfast", icon: <FiCoffee size={14} /> },
        { name: "Tv", icon: <FiTv size={14} /> }
    ]
    },
    {
      id: 7,
      name: "Center Resorts",
      location: "Banglore, India",
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      originalPrice: 4500,
      amenities: [
        { name: "Free WiFi", icon: <FiWifi size={14} /> },
        { name: "Breakfast", icon: <FiCoffee size={14} /> },
        { name: "Gym", icon: <FiDroplet size={14} /> },
        { name: "Spa", icon: <FiDroplet size={14} /> }
      ]
    },
    {
      id: 8,
      name: "Desert Resort",
      location: "Rajasthan, India",
      rating: 4.8,
      image: "https://cdn0.weddingwire.in/vendor/9126/3_2/960/jpg/hotel-welcomheritage-the-desert-resort-mandawa-rajasthan-guest-room_15_369126-162325017085680.jpeg",
      originalPrice: 7999,
      amenities: [
        { name: "Pool", icon: <FiDroplet size={14} /> },
        { name: "Breakfast", icon: <FiCoffee size={14} /> },
        { name: "Free WiFi", icon: <FiWifi size={14} /> }
    ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl text-center md:text-3xl font-bold text-gray-800 mb-6">Hotels</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {hotels.map((hotel) => (
          <AllHotels key={hotel.id} hotel={hotel} />
        ))}
      </div>
    </div>
  );
};

export default HotelCardsGrid;
