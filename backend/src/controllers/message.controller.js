import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/coudinary.js";
import { getReciverSocketId } from "../lib/socket.js";
import { io } from "../lib/socket.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedUserId },
    }).select("-password");
    res.status(200).json(filteredUsers);
  } catch (err) {
    console.error("Error in getUsersForSidebar controller:", err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        // $or is used to find messages where either sender or receiver matches
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });
    res.status(200).json(messages);
  } catch (err) {
    console.error("Error in getMessages controller:", err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;
    const { text, image } = req.body;

    let imageUrl = null;
    if(image){
      const uploadedResponce = await cloudinary.uploader.upload(image);
      imageUrl = uploadedResponce.secure_url;
    }

    const newMessage = await Message.create({
      senderId: myId,
      receiverId: userToChatId,
      text,
      image: imageUrl,
    });

    if (!newMessage) {
      return res.status(500).json({
        message: "Failed to send message",
      });
    }
    await newMessage.save();
    // send message to reciver
    const reciverSocketId = getReciverSocketId(userToChatId);
    if(reciverSocketId){
      io.to(reciverSocketId).emit("newMessage", newMessage);
    }
    res.status(201).json(newMessage);
  } catch (err) {
    console.error("Error in sendMessage controller:", err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
