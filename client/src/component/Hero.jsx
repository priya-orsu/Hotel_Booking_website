import { useState } from 'react';
import { FiSearch, FiMapPin, FiCalendar, FiUsers } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching hotels:', { location, checkIn, checkOut, guests });
  };

  return (
    <div className="relative bg-red-900 text-white">
      {/* Background image with overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div 
        className="bg-cover bg-center min-h-screen flex items-center px-4 py-20 sm:py-0"
        style={{ backgroundImage: "url('https://cdn.loewshotels.com/loewshotels.com-2466770763/cms/cache/v2/67ffa86527bc4.jpg/1920x1080/fit;c:0,0,1920,1079/80/11aadbe4041f63b3cca2bfb62b4a8540.jpg')" }}
      >
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 mt-10 sm:mb-6 text-center sm:text-left">
              Your Perfect Destination To Stay
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 text-center sm:text-center">
              Search for amazing hotels and resorts for your vacation
            </p>
            
            {/* Search Form */}
            <div className="bg-white rounded-lg shadow-xl p-4 sm:p-6 text-gray-800">
              <form onSubmit={handleSearch}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Location */}
                  <div className="relative">
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none mt-1">
                        <FiMapPin className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="location"
                        placeholder="Where are you going?"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* Check-in Date */}
                  <div className="relative">
                    <label htmlFor="check-in" className="block text-sm font-medium text-gray-700 mb-1">
                      Check-in
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none mt-1">
                        <FiCalendar className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="date"
                        id="check-in"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* Check-out Date */}
                  <div className="relative">
                    <label htmlFor="check-out" className="block text-sm font-medium text-gray-700 mb-1">
                      Check-out
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none mt-1">
                        <FiCalendar className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="date"
                        id="check-out"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* Guests */}
                  <div className="relative">
                    <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-1">
                      Guests
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none mt-1">
                        <FiUsers className="h-5 w-5 text-gray-400" />
                      </div>
                      <select
                        id="guests"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                        value={guests}
                        onChange={(e) => setGuests(parseInt(e.target.value))}
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? 'Guest' : 'Guests'}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="mt-6 text-center sm:text-left">
                  <Link to="/hotels">
                  <button
                    type="submit"
                    className="w-full sm:w-auto,text-center inline-flex justify-center items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md shadow-sm text-red bg-white-600 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                  >
                    <FiSearch className="mr-2" />
                    Search Hotels
                  </button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;