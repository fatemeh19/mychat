import { Server } from "socket.io";
import * as Services from "../services/index.js";

export default async (server) => {
  const io = new Server(server);

  io.on("connection", (socket) => {
    // console.log("user connected");

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
