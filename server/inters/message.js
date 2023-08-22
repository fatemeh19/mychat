
import * as RH from "../middlewares/ResponseHandler.js";

import messages from "../messages/messages.js";
import { StatusCodes } from "http-status-codes";

import {
  pinUnPinMessage,
  forwardMessage,
  createMessage,
  editMessage,
} from "../controllers/messageController.js";
const createMessageI = async (req, res, next) => {
  const {
    params: { chatId },
    body: message,
    user: { userId },
    file,
  } = req;
  const newMessage = await createMessage(chatId, message, userId, file);
  
  res.locals.response = {
    statusCode : StatusCodes.OK,
    value: {
      message:newMessage
    },
    responseType:messages.ok
  }
  next()
};
const forwardMessageI = async (req, res, next) => {
  const {
    params: { chatId },
    body: { messageIds },
    user: { userId },
  } = req;
  const forwardInfo = await forwardMessage(chatId, messageIds, userId);

  
  res.locals.response = {
    statusCode : StatusCodes.OK,
    value: {
      forwardInfo
    },
    responseType:messages.ok
  }
  next()
};
const pinUnPinMessageI = async (req, res, next) => {
  const {
    params: { chatId },
    body: { messageId, pin },
    user: { userId },
  } = req;
  const pinnedInfo = { messageId, chatId, pin };
  await pinUnPinMessage(userId, pinnedInfo);
  res.locals.response = {
    statusCode : StatusCodes.OK,
    responseType:messages.ok
  }
  next()
};
const editMessageI = async (req, res, next) => {
  const {
    body,
    file,
    params: { id: messageId },
  } = req;
  const editedMessage = await editMessage(body,file,messageId)
  res.locals.response = {
    statusCode : StatusCodes.OK,
    value: {
      message: editedMessage,
    },
    responseType:messages.ok
  }
  next()
  
};


export {
  editMessageI,
  pinUnPinMessageI,
  forwardMessageI,
  createMessageI,
};
