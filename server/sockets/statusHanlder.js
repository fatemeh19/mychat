import * as Services from "../services/dbServices.js";
import { setStatus } from "../controllers/userController.js";
export default function (io) {
  const online = function () {
    const socket = this;
    const userId = socket.user.userId;
    setStatus({ userId, online: true });
    // socket.data.userId = userId
    socket.broadcast.emit("onlineContact", userId);
  };

  const offline = function () {
    const socket = this;
    const userId = socket.user.userId;
    // console.log(socket.data.userId)
    setStatus({ userId, online: false });
    socket.broadcast.emit("offlineContact", userId);

    //   socket.on("disconnecting", () => {
    //     console.log(socket.rooms); // the Set contains at least the socket ID
    //   });
  };

  return { online, offline };
}

// export default statusHandler
