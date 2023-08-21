
import * as RH from "../middlewares/ResponseHandler.js";


import { StatusCodes } from "http-status-codes";

import {
  pinUnPinMessage,
  forwardMessage,
  createMessage,
  editMessage,
} from "../controllers/messageController.js";
const createMessageI = async (req, res) => {
  const {
    params: { chatId },
    body: message,
    user: { userId },
    file,
  } = req;
  const newMessage = await createMessage(chatId, message, userId, file);
  await RH.SendResponse({
    res,
    statusCode: StatusCodes.OK,
    title: "ok",
    value: {
      message: newMessage,
    },
  });
};
const forwardMessageI = async (req, res) => {
  const {
    params: { chatId },
    body: { messageIds },
    user: { userId },
  } = req;
  const forwardInfo = await forwardMessage(chatId, messageIds, userId);

  await RH.SendResponse({
    res,
    statusCode: StatusCodes.OK,
    title: "ok",
    value: {
      forwardInfo,
    },
  });
};
const pinUnPinMessageI = async (req, res) => {
  const {
    params: { chatId },
    body: { messageId, pin },
    user: { userId },
  } = req;
  const pinnedInfo = { messageId, chatId, pin };
  await pinUnPinMessage(userId, pinnedInfo);
  await RH.SendResponse({
    res,
    statusCode: StatusCodes.OK,
    title: "ok",
  });
};
const editMessageI = async (req, res) => {
  const {
    body,
    file,
    params: { id: messageId },
  } = req;
  const editedMessage = await editMessage(body,file,messageId)

  await RH.SendResponse({
    res,
    statusCode: StatusCodes.OK,
    title: "ok",
    value: {
      message: editedMessage,
    },
  });
};


export {
  editMessageI,
  pinUnPinMessageI,
  forwardMessageI,
  createMessageI,
};
