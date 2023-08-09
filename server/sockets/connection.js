import { Server } from "socket.io";
import * as Services from "../services/index.js";
import statusHandler from "./statusHanlder.js";
import chatHandler from "./chatHandler.js";
import authMiddleware from './authorization.js'
// const { createOrder, readOrder } = require("./orderHandler")(io);
export default async (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      credentials: true,
    },
  });
  const { online, offline } = statusHandler(io);
  const {deleteChat,editMessage,pinUnpinMessage, onChat,sendMessage,deleteMessage,seenMessage,forwardMessage } = chatHandler(io);

  // const onChat = io.of("/onChat");
  // onChat.on("connection", (socket) => {
  //   console.log("user connected to onChat namespace");
  //   socket.on("onChat", async (userId, contactId) => {
  //     console.log("user connected to onChat namespace");

  //     let roomName =
  //       userId > contactId ? userId + "" + contactId : contactId + "" + userId;
  //     socket.join(roomName);
  //     // onChat.to(roomName).emit("onlineOnChat", userId);
  //     socket.to(roomName).emit("onlineOnChat", userId);
  //   });
  //   socket.on("sendMessage", async (userId, contactId, message) => {
  //     let roomName =
  //       userId > contactId ? userId + "" + contactId : contactId + "" + userId;
  //     socket.to(roomName).emit("sendMessage", message);
  //   });
  // });

  const onConnection = (socket) => {
    
    console.log("user connected to general socket");
    socket.on("online", online);
    // socket.on("offline", offline);
    socket.on("deleteChat",deleteChat)
    socket.on("onChat", onChat);
    socket.on("editMessage",editMessage)
    socket.on("sendMessage",sendMessage)
    socket.on("deleteMessage",deleteMessage)
    socket.on("seenMessage",seenMessage)
    socket.on("forwardMessage",forwardMessage)
    socket.on("pinUnpinMessage",pinUnpinMessage)
    socket.on("disconnecting",offline)
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
    
  };
  io.use(authMiddleware)
  
  io.on("connection", onConnection);
};
