const express = require("express");
const router = express.Router();
const Room = require("../models/roomModel");


// Get all rooms
router.get("/getallrooms", async (req, res) => {

  try {

    const rooms = await Room.find({});
    res.status(200).json(rooms);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Failed to fetch rooms"
    });
  }

});


// Get room by id
router.post("/getroombyid", async (req,res)=>{

    const { roomid } = req.body;

    try{

        const room = await Room.findById(roomid);

        res.status(200).json(room);

    }
    catch(error){

        res.status(500).json(error);

    }

});


// Add room
router.post("/addroom", async(req,res)=>{

    try{

        const newRoom = new Room(req.body);

        const savedRoom = await newRoom.save();

        res.status(201).json(savedRoom);

    }
    catch(error){

        res.status(500).json(error);

    }

});


module.exports = router;