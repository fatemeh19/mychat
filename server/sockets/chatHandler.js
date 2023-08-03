import Chat from "../models/Chat.js";
import * as Services from "../services/index.js";
import { DeleteMessage } from "../controllers/messageController.js";
export default function (io) {
  const onChat = function (chatId) {
    const socket = this;
    const userId = socket.user.userId;
    console.log("user connected to chat");
    socket.join(chatId);
    // socket.to(roomName).emit("onlineOnChat", userId);
  };

  const sendMessage = async function (chatId, message) {
    const socket = this;
    // const userId = socket.user.userId;
    io.to(chatId).emit("sendMessage", message);
  };

  const deleteMessage = async function (deleteInfo) {
    const socket = this;
    const userId = socket.user.userId;
    const { chatId } = deleteInfo;
    DeleteMessage(userId, deleteInfo);

    io.to(chatId).emit("deleteMessage", deleteInfo);
  };

  const seenMessage = async function (chatId, messageId) {
    const socket = this;
    const userId = socket.user.userId;
    Services.Chat.findAndUpdateChat(
      chatId,
      {
        $push: { "messages.$[message].seenIds": userId },
      },
      {
        arrayFilters: [{ "message._id": messageId }],
      }
    );

    socket.to(chatId).emit("seenMessage", messageId, userId);
  };

  const forwardMessage = async function (chatId, messageIds) {
    const socket = this;
    const userId = socket.user.userId;

    const forwardedMessages = await Services.Message.getMessages({
      _id: { $in: messageIds },
    });
    const messages = []
    forwardedMessages.forEach((forwardedMessage) => {
      messages.push({
        messageId: forwardedMessage._id,
        forwarded: {
          isForwarded:true,
          by:userId
        },
      });
    });
  
    const chat = await Services.Chat.findAndUpdateChat(
      chatId,
      {
        $push: { messages: { $each: messages } },
      },
      { new: true }
    );
    const forwardInfo = {
      forwardedMessages,
      forwardedBy: userId,
      chat,
    }

    io.to(chatId).emit("forwardMessage", forwardInfo);

  };

  return {forwardMessage,onChat, sendMessage, deleteMessage, seenMessage };
}
