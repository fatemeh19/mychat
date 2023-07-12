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
    const { chatId, deleteAll } = deleteInfo;
    DeleteMessage(userId, deleteInfo);
    const chat = await Services.Chat.getChat({ _id: chatId });
    const memberIds = chat.memberIds;

    let roomName =
      memberIds[0] > memberIds[1]
        ? memberIds[0] + "" + memberIds[1]
        : memberIds[1] + "" + memberIds[0];
    if (deleteAll) {
      io.to(roomName).emit("deleteMessage", deleteInfo);
    }

    // const { chatId, messageIs, deleteAll } = deleteInfo;
  };

  const seenMessage = async function (messageId) {
    const socket = this;
    const userId = socket.user.userId;
    const chat = await Services.Chat.getChat({ messages: messageId });
    await Services.Message.updateMessages({_id:messageId},{$push:{seenIds:userId}})
    const memberIds = chat.memberIds;
    let roomName =
      memberIds[0] > memberIds[1]
        ? memberIds[0] + "" + memberIds[1]
        : memberIds[1] + "" + memberIds[0];

    socket.to(roomName).emit("seenMessage", messageId);
  };

  return { onChat, sendMessage, deleteMessage,seenMessage };
}
