import { useState, useEffect } from 'react';
import axios from 'axios';
import Room from '../component/Room';
import {FaSpinner} from 'react-icons/fa'

const AllRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get('http://hotel-booking-backend.onrender.com/api/rooms/getallrooms', {
          withCredentials: true
        });
        setRooms(response.data);
        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <FaSpinner className="animate-spin text-red-600 text-4xl mr-3" />
      <span className="text-xl">Loading room details...</span>
    </div>
  );

  return (
    <div className="container mt-4">
      <h2>Available Rooms</h2>
      {loading ? (
        <h4>Loading...</h4>
      ) : error ? (
        <h4>Error fetching rooms</h4>
      ) : (
        rooms.map((room) => (
          <div key={room._id} className="mb-3">
            <Room room={room} key={room._id} />
          </div>
        ))
      )}
    </div>
  );
};

export default AllRooms;
