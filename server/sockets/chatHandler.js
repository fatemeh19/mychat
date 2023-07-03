import Chat from "../models/Chat.js";
import * as Services from "../services/index.js";
import { DeleteMessage } from "../controllers/messageController.js";
export default function (io) {
  const onChat = function (contactId) {
    const socket = this;
    const userId = socket.user.userId;
    console.log("user connected to chat");
    let roomName =
      userId > contactId ? userId + "" + contactId : contactId + "" + userId;
    socket.join(roomName);
    socket.to(roomName).emit("onlineOnChat", userId);
  };

  const sendMessage = async function (contactId, message) {
    const socket = this;
    const userId = socket.user.userId;
    let roomName =
      userId > contactId ? userId + "" + contactId : contactId + "" + userId;
    socket.to(roomName).emit("sendMessage", message);
  };

  const deleteMessage = async function (deleteInfo) {
    const socket = this;
    const userId = socket.user.userId;
    const { chatId, messageIs, deleteAll } = deleteInfo;
    DeleteMessage(userId, deleteInfo);
    const chat = await Services.Chat.getChat({ _id: chatId });
    const memberIds = chat.memberIds;
    
    let roomName =
      memberIds[0] > memberIds[1]
        ? memberIds[0] + "" + memberIds[1]
        : memberIds[1] + "" + memberIds[0];
    if(deleteAll){
      io.to(roomName).emit("deleteMessage", deleteInfo);
    }

    // const { chatId, messageIs, deleteAll } = deleteInfo;
  };

  return { onChat, sendMessage, deleteMessage };
}
