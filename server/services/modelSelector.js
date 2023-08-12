import User from "../models/User.js";
import Chat from "../models/Chat.js";
import Message from "../models/message.js";
import Folder from "../models/folder.js";
import Group from "../models/Group.js";
import privateChat from "../models/privateChat.js";
import Setting from "../models/Setting.js";

const modelSelector = async (model) => {
  switch (model) {
    case "group":
      return Group;
    case "private":
      return privateChat;
    case "user":
      return User;
    case "message":
      return Message;
    case "chat":
      return Chat;
    case "folder":
      return Folder;
    case "setting":
      return Setting

  }
};

export default modelSelector;
