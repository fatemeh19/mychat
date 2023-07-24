import Chat from "../models/Chat.js";
import Fields from "../messages/fields.js";
import * as RH from "../middlewares/ResponseHandler.js";
import mongooseErrorExtractor from "../utils/mongooseErrorExtractor.js";
import * as CustomError from "../errors/index.js";
import { Query } from "mongoose";
import { chatType } from "../utils/enums.js";
import GroupChat from "../models/Group.js";
import PrivateChat from "../models/privateChat.js";
import Group from "../models/Group.js";

const createChat = async (chat) => {
  let newChat;
  if (chat.chatType == chatType[0]) {
    newChat = await GroupChat.create(chat);
    console.log("newChat");
  } else {
    newChat = await PrivateChat.create(chat);
  }
  return newChat;
};
const findAndUpdateChat = async (
  id,
  updateQuery,
  options,
  chatType = "private"
) => {
  try {
    let chatModel = Chat;
    if (chatType == "group") {
      chatModel = Group;
    }
    const chat = await chatModel.findByIdAndUpdate(id, updateQuery,options);

    return chat;
  } catch (err) {
    console.log(err);
    const { errorType, field } = await mongooseErrorExtractor(err);
    return await RH.CustomError({
      errorClass: CustomError.BadRequestError,
      errorType,
      Field: Fields[field],
    });
  }
};
const getChat = async (Query) => {
  try {
    const chat = await Chat.findOne(Query);
    return chat;
  } catch (err) {
    const { errorType, field } = await mongooseErrorExtractor(err);

    return await RH.CustomError({
      errorClass: CustomError.BadRequestError,
      errorType,
      Field: Fields[field],
    });
  }
};
const getChats = async (Query, select = "", sort = "") => {
  const chats = await Chat.find(Query).select(select).sort(sort);
  return chats;
};

export { getChat, createChat, findAndUpdateChat, getChats };
