// const token = socket.handshake.auth.token;
import '../utils/loadEnv.js'
import * as CustomError  from "../errors/index.js";
import ErrorMessages from "../messages/errors.js"
import jwt from "jsonwebtoken";
// import * as RH from "./ResponseHandler.js";
const authMiddleware = function (socket, next) {
  const { auth:{token:authHeader}} =  socket.handshake
//   console.log(authHeader)
  if (!authHeader || !authHeader?.startsWith("Bearer ")) {
     next(new Error("invalid token"));
  }

  const token = authHeader?.split(" ")[1];
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    
    const { userId } = decoded;
    socket.user = { userId };
    next();
  } catch (err) {
    console.log(err)
    next(new Error("invalid credentials"));


  }
};
export default  authMiddleware;


// export default function (io) {
//     const onChat = function (userId, contactId) {
//       const socket = this;
//       console.log("user connected to chat");
//       let roomName =
//         userId > contactId ? userId + "" + contactId : contactId + "" + userId;
//       socket.join(roomName);
//       socket.to(roomName).emit("onlineOnChat", userId);
//     };
  
//     const sendMessage =async function (userId, contactId, message) {
//       const socket = this;
//       let roomName =
//         userId > contactId ? userId + "" + contactId : contactId + "" + userId;
//       socket.to(roomName).emit("sendMessage", message);
//     };
  
//     const deleteMessage = function (deleteInfo) {
//       console.log(deleteInfo)
//       const socket = this;
//     };
  
//     return { onChat, sendMessage };
//   }
  

