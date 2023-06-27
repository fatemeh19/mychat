import User from "../models/User.js";
import message from "../models/message.js";
import Chat from "../models/Chat.js";
const deleteUsers = async (req, res) => {
  await User.deleteMany({});
  res.status(200).json({ msg: "successfull" });
};

const deleteMessages = async (req, res) => {
  await message.deleteMany({});
  res.status(200).json({ msg: "successfull" });
};

const deleteChats = async (req, res) => {
  await Chat.deleteMany({});
  res.status(200).json({ msg: "successfull" });
};

const deleteAll = async (req, res) => {
  await User.deleteMany({});
  await message.deleteMany({});
  await Chat.deleteMany({});
  res.status(200).json({ msg: "successfull" });
};
export { deleteChats, deleteMessages, deleteUsers, deleteAll };
