import * as Validators from "../validators/index.js";
import * as Services from "../services/index.js";
import * as RH from "../middlewares/ResponseHandler.js";
import * as CustomError from "../errors/index.js";
import ErrorMessages from "../messages/errors.js";
import fields from "../messages/fields.js";
import { StatusCodes } from "http-status-codes";
import message from "../models/message.js";
const createChat = async (req, res) => {
  const { memberIds } = req.body;
  const data = await Validators.createChat.validate({ memberIds });

  const chatExists = await Services.Chat.getChat({
    memberIds: { $size: 2, $all: memberIds },
  });

  if (chatExists) {
    await RH.CustomError({
      errorClass: CustomError.BadRequestError,
      errorType: ErrorMessages.DuplicateError,
      Field: fields.chat,
    });
  }
  const chat = await Services.Chat.createChat(memberIds);
  await RH.SendResponse({
    res,
    statusCode: StatusCodes.CREATED,
    title: "ok",
    value: {
      chatId: chat._id,
    },
  });
};

const getChat = async (req, res) => {
  // const { memberIds } = req.body;
  const {
    user: { userId },
    params: { contactId },
  } = req;
  const memberIds = [userId, contactId];

  // const data = await Validators.createChat.validate({ memberIds });

  const chat = await Services.Chat.getChat({
    memberIds: { $size: 2, $all: memberIds },
  });

  if (!chat) {
    await RH.CustomError({
      errorClass: CustomError.BadRequestError,
      errorType: ErrorMessages.NotFoundError,
      Field: fields.chat,
    });
  }
  const messages = await Services.Message.getMessages({
    _id: { $in: chat.messages },
  });

  chat.messages.splice(0, chat.messages.length);
  chat.messages = messages;

  await RH.SendResponse({
    res,
    statusCode: StatusCodes.OK,
    title: "ok",
    value: {
      chat,
    },
  });
};

const getChats = async (req, res) => {
  const {
    user: { userId },
  } = req;
  const chats = await Services.Chat.getChats({ memberIds: userId },"","-updatedAt");
  // res.send(chats);
  const messageIds = chats.map((chat)=> chat.messages[chat.messages.length-1])
  const messages = await Services.Message.getMessages({
    _id: { $in: messageIds },
  },"","-updatedAt");
  await chats.forEach((chat,index) => {
    chat.messages.splice(0, chat.messages.length);
    // console.log(chat)
    // console.log(messages[index])
    
    chat.messages.push(messages[index])

  });
  await RH.SendResponse({
    res,
    statusCode: StatusCodes.OK,
    title: "ok",
    value: {
      chats,
    },
  });
};

export { createChat, getChat, getChats };
