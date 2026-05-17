import { useState, useEffect } from "react";
import axios from "axios";
import Room from "../component/Room";
import { FaSpinner } from "react-icons/fa";

const AllRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      setError(false);

      console.log("Calling API...");

      const response = await axios.get(
        "http://localhost:5001/api/rooms/getallrooms"
      );

      console.log("Success:", response.data);

      setRooms(response.data);

    } catch (err) {
      console.log("Error:", err);

      setError(true);

    } finally {
      console.log("Finished request");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="animate-spin text-red-600 text-4xl mr-3" />
        <span className="text-xl">Loading room details...</span>
      </div>
    );
  }

  if (error) {
    return (
      <h2 className="text-center text-red-500 mt-10">
        Error fetching rooms
      </h2>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-2xl font-bold">
        Available Rooms
      </h2>

      {rooms.length > 0 ? (
        rooms.map((room) => (
          <div key={room._id} className="mb-3">
            <Room room={room} />
          </div>
        ))
      ) : (
        <h2>No rooms found</h2>
      )}
    </div>
  );
};

export default AllRooms;