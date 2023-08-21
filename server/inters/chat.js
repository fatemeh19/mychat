import * as RH from "../middlewares/ResponseHandler.js";

import { StatusCodes } from "http-status-codes";

import "../utils/loadEnv.js";

import {
  searchChat,
  addToChats,
  DeleteChat,
  pinUnpinChat,
  createChat,
  getChat,
  getChats,
} from "../controllers/chatController.js";

const createChatI = async (req, res) => {
  const {
    body: body,
    user: { userId },
    file,
  } = req;
  const chat = await createChat(body, userId, file);
  await RH.SendResponse({
    res,
    statusCode: StatusCodes.CREATED,
    title: "ok",
    value: {
      chat,
    },
  });
};

const getChatI = async (req, res) => {
  const {
    user: { userId },
    params: { id: chatId },
  } = req;
  const chat = await getChat(userId, chatId);

  await RH.SendResponse({
    res,
    statusCode: StatusCodes.OK,
    title: "ok",
    value: {
      chat,
    },
  });
};

const getChatsI = async (req, res) => {
  const {
    user: { userId },
  } = req;
  const chats = await getChats(userId);

  await RH.SendResponse({
    res,
    statusCode: StatusCodes.OK,
    title: "ok",
    value: {
      chats,
    },
  });
};
const addToChatsI = async (req, res) => {
  const {
    params: { id: chatId },
    user: { userId },
  } = req;
  await addToChats(userId, chatId);

  RH.SendResponse({ res, statusCode: StatusCodes.OK, title: "ok" });
};
const pinUnpinChatI = async (req, res) => {
  const {
    body,
    params: { id: chatId },
    user: { userId },
  } = req;
  await pinUnpinChat(body, userId, chatId);

  await RH.SendResponse({
    res,
    statusCode: StatusCodes.OK,
    title: "ok",
  });
};

const deleteChatI = async (req, res) => {
  const {
    params: { id: chatId },
    user: { userId },
    body: { deleteAll },
  } = req;
  await DeleteChat(userId, { deleteAll, chatId });

  await RH.SendResponse({
    res,
    statusCode: StatusCodes.OK,
    title: "ok",
  });
};

const searchChatI = async (userId, search) => {
 
  const chats = await searchChat(userId, search);

  RH.SendResponse({
    res,
    statusCode: StatusCodes.OK,
    title: "ok",
    value: {
      chats,
    },
  });
};

export {
  addToChatsI,
  deleteChatI,
  pinUnpinChatI,
  createChatI,
  getChatI,
  getChatsI,
  searchChatI,
};
