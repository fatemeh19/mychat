import Chat from "../models/Chat.js";
import * as Services from "../services/dbServices.js";
import {searchMessage, DeleteMessage,pinUnPinMessage } from "../controllers/messageController.js";
import { searchChat,DeleteChat } from "../controllers/chatController.js";
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
  const editMessage = async function (chatId, message,subId) {
    const socket = this;
    // const userId = socket.user.userId;
    io.to(chatId).emit("editMessage", message, subId);
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
    Services.findByIdAndUpdate('chat',
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

    let forwardedMessages = await Services.findMany('message',{
      _id: { $in: messageIds },
    });
    let forwardedMsgs = [...forwardedMessages]
    const messages = []
    forwardedMessages.forEach((forwardedMessage) => {
      messages.push({
        messageInfo: forwardedMessage._id,
        forwarded: {
          isForwarded:true,
          by:userId
        },
      });
    });
  
    const chat = await Services.findByIdAndUpdate('chat',
      chatId,
      {
        $push: { messages: { $each: messages } },
      },
      { new: true }
    );
    
    forwardedMessages = chat.messages.slice(chat.messages.length-messages.length,chat.messages.length)
    forwardedMessages.forEach((forwardedMessage, index)=>{
      forwardedMessage.messageInfo = forwardedMsgs[index]
    })

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
    DeleteChat(userId, deleteInfo);

    if(deleteAll){
      io.to(chatId).emit("deleteChat", deleteInfo);
    }

  }
  const searChat = async function(search){
    const socket = this;
    const userId = socket.user.userId;
    const chats = await searchChat(userId,search)
    socket.emit('searchChat',chats)
  }
  const searchMessages = async function(chatId,search){
    const socket = this;
    const userId = socket.user.userId;
    const messages = await searchMessage(userId,chatId,search)
    socket.emit('searchMessage',messages)
  }

  return {searchMessages,searChat,deleteChat,editMessage,pinUnpinMessage,forwardMessage,onChat, sendMessage, deleteMessage, seenMessage };
}
