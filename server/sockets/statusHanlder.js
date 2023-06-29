import * as Services from "../services/index.js";
export default function (io) {
  const online = function () {
    const socket = this;
    const userId = socket.user.userId
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
    console.log(socket);
    socket.data.userId = userId
    socket.broadcast.emit("onlineContact", userId);
  };

  const offline = function () {
    const socket = this
    const userId = socket.user.userId
    // console.log(socket.data.userId)
    Services.User.findAndUpdateUser(userId, {
      status: {
        online: false,
        lastseen: Date.now(),
      },
    });
    socket.broadcast.emit("offlineContact", userId);

    //   socket.on("disconnecting", () => {
    //     console.log(socket.rooms); // the Set contains at least the socket ID
    //   });
  };

  return { online, offline };
}

// export default statusHandler
