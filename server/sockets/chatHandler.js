import Chat from "../models/Chat.js";
import * as Services from '../services/index.js'
export default function (io) {
  const onChat = function (contactId) {
    const socket = this;
    const userId = socket.user.userId
    console.log("user connected to chat");
    let roomName =
      userId > contactId ? userId + "" + contactId : contactId + "" + userId;
    socket.join(roomName);
    socket.to(roomName).emit("onlineOnChat", userId);
  };

  const sendMessage =async function (contactId, message) {
    const socket = this;
    const userId = socket.user.userId
    let roomName =
      userId > contactId ? userId + "" + contactId : contactId + "" + userId;
    socket.to(roomName).emit("sendMessage", message);

  };

  const deleteMessage =async function (deleteInfo) {
    const {chatId,messageIs,deleteAll} = deleteInfo
    const socket = this;
    const userId = socket.user.userId

    const chat = await Services.Chat.
    
    console.log(deleteInfo)

  };

  return { onChat, sendMessage,deleteMessage };
}
