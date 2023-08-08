import Chat from "../models/Chat.js";
import * as Services from "../services/index.js";
import { DeleteMessage,pinUnPinMessage } from "../controllers/messageController.js";
import { DeleteChat } from "../controllers/chatController.js";
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
  const editMessage = async function (chatId, message) {
    const socket = this;
    // const userId = socket.user.userId;
    io.to(chatId).emit("editMessage", message);
  };

  const deleteMessage = async function (deleteInfo) {
    const socket = this;
    const userId = socket.user.userId;
    const { chatId,deleteAll } = deleteInfo;
    DeleteMessage(userId, deleteInfo);

    if(deleteAll){
      io.to(chatId).emit("deleteMessage", deleteInfo);
    }
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

    let forwardedMessages = await Services.Message.getMessages({
      _id: { $in: messageIds },
    });
    const messages = []
    forwardedMessages.forEach((forwardedMessage) => {
      messages.push({
        messageInfo: forwardedMessage,
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
    // forwardedMessages = []
    forwardedMessages = chat.messages.slice(chat.messages.length-messages.length,chat.messages.length)
    // const forwardInfo = {
    //   forwardedMessages
    // }

    io.to(chatId).emit("forwardMessage", forwardedMessages);

  };

  const pinUnpinMessage = async function(pinnedInfo){
    const socket = this;
    const userId = socket.user.userId;
    pinUnPinMessage(userId,pinnedInfo)
    const {chatId} = pinnedInfo
    io.to(chatId).emit("pinUnpinMessage",userId,pinnedInfo)

  }

  const deleteChat = async function(deleteInfo){
    const socket = this;
    const userId = socket.user.userId;
    const { chatId,deleteAll } = deleteInfo;
    DeleteChat( deleteInfo);

    if(deleteAll){
      io.to(chatId).emit("deleteChat", deleteInfo);
    }

  }

  return {deleteChat,editMessage,pinUnpinMessage,forwardMessage,onChat, sendMessage, deleteMessage, seenMessage };
}
