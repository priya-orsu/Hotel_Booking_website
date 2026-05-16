import React, { useState } from "react";
import axios from "axios";

const AddRoom = () => {

  const [room, setRoom] = useState({
    name: "",
    maxcount: "",
    phonenumber: "",
    rentperday: "",
    imageurls: "",
    type: "",
    description: "",
  });

  const token = localStorage.getItem("token");

  // HANDLE CHANGE
  const handleChange = (e) => {

    setRoom({
      ...room,
      [e.target.name]: e.target.value,
    });
  };

  // SUBMIT
  const addRoom = async (e) => {

    e.preventDefault();

    try {

      const roomData = {
        ...room,

        imageurls: room.imageurls
          .split(",")
          .map((url) => url.trim()),
      };

      const response = await axios.post(
        "https://hotel-booking-backend.onrender.com/api/admin/addroom",
        roomData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Room Added Successfully");

      console.log(response.data);

      // CLEAR FORM
      setRoom({
        name: "",
        maxcount: "",
        phonenumber: "",
        rentperday: "",
        imageurls: "",
        type: "",
        description: "",
      });

    } catch (error) {

      console.log(error);

      alert("Failed to Add Room");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-28 px-6">

      <div className="max-w-3xl mx-auto bg-white p-10 rounded-3xl shadow-xl">

        <h1 className="text-4xl font-bold text-center text-red-700 mb-8">
          Add New Room
        </h1>

        <form
          onSubmit={addRoom}
          className="space-y-5"
        >

          <input
            type="text"
            name="name"
            placeholder="Room Name"
            value={room.name}
            onChange={handleChange}
            className="w-full border p-4 rounded-xl"
            required
          />

          <input
            type="number"
            name="maxcount"
            placeholder="Max Count"
            value={room.maxcount}
            onChange={handleChange}
            className="w-full border p-4 rounded-xl"
            required
          />

          <input
            type="number"
            name="phonenumber"
            placeholder="Phone Number"
            value={room.phonenumber}
            onChange={handleChange}
            className="w-full border p-4 rounded-xl"
            required
          />

          <input
            type="number"
            name="rentperday"
            placeholder="Rent Per Day"
            value={room.rentperday}
            onChange={handleChange}
            className="w-full border p-4 rounded-xl"
            required
          />

          <input
            type="text"
            name="imageurls"
            placeholder="Image URLs (comma separated)"
            value={room.imageurls}
            onChange={handleChange}
            className="w-full border p-4 rounded-xl"
            required
          />

          <input
            type="text"
            name="type"
            placeholder="Room Type"
            value={room.type}
            onChange={handleChange}
            className="w-full border p-4 rounded-xl"
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={room.description}
            onChange={handleChange}
            className="w-full border p-4 rounded-xl h-32"
            required
          />

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl text-lg font-semibold"
          >
            Add Room
          </button>

        </form>

      </div>

    </div>
  );
};

export default AddRoom;