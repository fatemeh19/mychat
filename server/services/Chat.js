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
import privateChat from "../models/privateChat.js";
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
const findAndUpdateChat = async (id, updateQuery, options) => {
  const chatType = await Chat.findById(id, { chatType: 1 });
  try {
    let chatModel 
    if (chatType.chatType == "group") {
      chatModel = Group;
    }else{
      chatModel = privateChat;
    }
   
    const chat = await chatModel.findByIdAndUpdate(id, updateQuery, options);

    return chat;
  } catch (err) {
    console.log(err)
    const { errorType, field } = await mongooseErrorExtractor(err);
    return await RH.CustomError({
      errorClass: CustomError.BadRequestError,
      errorType,
      Field: Fields[field],
    });
  }
};
const getChat = async (Query,select={}) => {
  try {
    const chat = await Chat.findOne(Query).select(select)
    return chat;
  } catch (err) {
    console.log(err)
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

const aggregateChats = async (pipeLine)=>{
  const result = await Chat.aggregate(pipeLine) 
  return result
}

export {aggregateChats, getChat, createChat, findAndUpdateChat, getChats };
