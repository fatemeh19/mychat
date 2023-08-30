import * as RH from "../middlewares/ResponseHandler.js";

import { StatusCodes } from "http-status-codes";

import "../utils/loadEnv.js";
import messages from "../messages/messages.js";

import {
  searchChat,
  addToChats,
  DeleteChat,
  pinUnpinChat,
  createChat,
  getChat,
  getChats,
  muteUnmuteNotifications
} from "../controllers/chatController.js";

const createChatI = async (req, res,next) => {
  const {
    body: body,
    user: { userId },
    file,
  } = req;
  const chat = await createChat(body, userId, file);
  res.locals.response = {
    statusCode : StatusCodes.CREATED,
    value:{
      chat
    },
    responseType:messages.ok
  }
  next()
  
};

const getChatI = async (req, res,next) => {
  const {
    user: { userId },
    params: { id: chatId },
  } = req;
  const chat = await getChat(userId, chatId);

  
  res.locals.response = {
    statusCode : StatusCodes.OK,
    value:{
      chat
    },
    responseType:messages.ok
  }
  next()
};

const getChatsI = async (req, res,next) => {
  const {
    user: { userId },
  } = req;
  const chats = await getChats(userId);
  res.locals.response = {
    statusCode : StatusCodes.OK,
    value:{
      chats
    },
    responseType:messages.ok
  }
  next()
  
};
const addToChatsI = async (req, res, next) => {
  const {
    params: { id: chatId },
    user: { userId },
  } = req;
  await addToChats(userId, chatId);

  res.locals.response = {
    statusCode : StatusCodes.OK,
    responseType:messages.ok
  }
  next()
};
const pinUnpinChatI = async (req, res, next) => {
  const {
    body,
    params: { id: chatId },
    user: { userId },
  } = req;
  await pinUnpinChat(body, userId, chatId);

  res.locals.response = {
    statusCode : StatusCodes.OK,
    responseType:messages.ok
  }
  next()
};

const deleteChatI = async (req, res, next) => {
  const {
    params: { id: chatId },
    user: { userId },
    body: { deleteAll },
  } = req;
  await DeleteChat(userId, { deleteAll, chatId });

  res.locals.response = {
    statusCode : StatusCodes.OK,
    responseType:messages.ok
  }
  next()
};
const muteUnmuteNotificationsI = async (req, res, next)=>{
  const {id} = req.params
  await muteUnmuteNotifications(id)
  res.locals.response = {
    statusCode : StatusCodes.OK,
    responseType:messages.ok
  }
  next()

}



export {
  addToChatsI,
  deleteChatI,
  pinUnpinChatI,
  createChatI,
  getChatI,
  getChatsI,
  muteUnmuteNotificationsI
};
