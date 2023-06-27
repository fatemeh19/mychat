import { Server } from "socket.io";
import * as Services from "../services/index.js";

export default async (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });
  const onChat = io.of("/onChat");

  onChat.on("connection", (socket) => {
    console.log("user connected to onChat namespace");
    socket.on("onChat", async (userId, contactId) => {
      console.log("user connected to onChat namespace");

      let roomName =
        userId > contactId ? userId + "" + contactId : contactId + "" + userId;
      socket.join(roomName);
      // onChat.to(roomName).emit("onlineOnChat", userId);
      socket.to(roomName).emit("onlineOnChat", userId);
    });
    socket.on("sendMessage", async (userId, contactId, message) => {
      let roomName =
        userId > contactId ? userId + "" + contactId : contactId + "" + userId;
      socket.to(roomName).emit("sendMessage", message);
    });
  });

  io.on("connection", (socket) => {
    console.log("user connected to general socket");

    socket.on("online", (userId) => {
      Services.User.findAndUpdateUser(
        userId,
        {
          status: {
            online: true,
            lastseen: Date.now(),
          },
        },
        socket
      );

      socket.broadcast.emit("onlineContact", userId);
    });

    socket.on("offline", (userId) => {
      Services.User.findAndUpdateUser(userId, {
        status: {
          online: false,
          lastseen: Date.now(),
        },
      });
    });
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
};
