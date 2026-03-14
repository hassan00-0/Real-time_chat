import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getRecieverSocketId } from "../lib/socket.js";
export const getUsersForSideBar = async (req, res) => {
  try {
    const loggedUser = req.user._id;
    const filteredUsers = await User.find({ _id: { $ne: loggedUser } }).select(
      "-password",
    );
    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const myId = req.user._id;
    const { id: receiverId } = req.params;

    const messages = await Message.find({
      $or: [
        { userId: myId, receiverId: receiverId },
        { userId: receiverId, receiverId: myId },
      ],
    });
    res.status(200).json(messages);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const myId = req.user._id;
    const { id: receiverId } = req.params;
    const { text, image } = req.body;

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }
    const message = new Message({
      userId: myId,
      receiverId: receiverId,
      text: text,
      image: imageUrl,
    });
    await message.save();

    const receiverSocketId = getRecieverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", message);
    }

    res.status(201).json(message);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
