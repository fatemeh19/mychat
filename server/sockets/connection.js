import { Server } from "socket.io";
import * as Services from "../services/dbServices.js";
import statusHandler from "./statusHanlder.js";
import chatHandler from "./chatHandler.js";
import groupHandler from "./groupHandler.js";
import authMiddleware from "./authorization.js";
import errorCreator from "../utils/errorCreator.js";
export default async (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      credentials: true,
    },
  });
  const { online, offline } = statusHandler(io);
  const {
    searchMessages,
    searChat,
    deleteChat,
    editMessage,
    pinUnpinMessage,
    onChat,
    sendMessage,
    deleteMessage,
    seenMessage,
    forwardMessage,
  } = chatHandler(io);
  const {
    add_member,
    remove_member,
    edit_groupInfo,
    edit_groupPermissions,
    edit_groupType,
  } = groupHandler(io);
  const onConnection = (socket) => {
    try {
      console.log("user connected to general socket");
      socket.on("online", online);
      socket.on("searchMessage", searchMessages);
      socket.on("searchChat", searChat);
      socket.on("deleteChat", deleteChat);
      socket.on("onChat", onChat);
      socket.on("editMessage", editMessage);
      socket.on("sendMessage", sendMessage);
      socket.on("deleteMessage", deleteMessage);
      socket.on("seenMessage", seenMessage);
      socket.on("forwardMessage", forwardMessage);
      socket.on("pinUnpinMessage", pinUnpinMessage);
      socket.on("disconnecting", offline);

      socket.on("addMember", add_member);
      socket.on("removeMember", remove_member);
      socket.on("editGroupInfo", edit_groupInfo);
      socket.on("editGroupPermissions", edit_groupPermissions);
      socket.on("editGroupType", edit_groupType);

      socket.on("disconnect", () => {
        console.log("user disconnected");
      });
    } catch (errors) {
      let { Error, statusCode } = errorCreator(errors);
      Error.statusCode = statusCode
      socket.emit('serverError',Error)
    }
  };
  io.use(authMiddleware);

  io.on("connection", onConnection);
};
