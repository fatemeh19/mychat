import Message from "../models/message.js";
import * as Validators from "../validators/index.js";
import * as Services from "../services/index.js";
import * as RH from "../middlewares/ResponseHandler.js";
import * as CustomError from "../errors/index.js";
import ErrorMessages from "../messages/errors.js";
import messages from "../messages/messages.js";
import fields from "../messages/fields.js";
import { StatusCodes } from "http-status-codes";
import path from "path";
import message from "../models/message.js";
const createMessage = async (req, res) => {
  const {
    params: { chatId },
    body: message,
    file,
  } = req;
  let url = file && message.content.contentType != "text" ? file.path : "";

  let newMessage = {
    reply: {
      isReplied: message?.reply?.isReplied,
      messageId: message?.reply?.messageId,
    },
    content: {
      contentType: message.content.contentType,
      text: message.content.text,
      url: url,
    },
    senderId: message.senderId,
  };

  let data;
  try {
    data = await Validators.createMessage.validate(newMessage, {
      stripUnknown: true,
      abortEarly: false,
    });
  } catch (err) {
    await RH.CustomError({ err, errorClass: CustomError.ValidationError });
  }
  if (!file || !newMessage.content.contentType) {
    // threw Error
    // console.log(file)
  }
  if (newMessage.reply.messageId) {
    const repliedMessage = await Services.Message.findMessage({
      _id: newMessage.reply.messageId,
    });
    if(!repliedMessage){
      return await RH.CustomError({
        errorClass: CustomError.BadRequestError,
        errorType: ErrorMessages.NotFoundError,
        Field: fields.message,
      });
    }
  }
  const Message = await Services.Message.createMessage(newMessage);
  const chat = await Services.Chat.findAndUpdateChat(chatId, {
    $push: { messages: Message._id },
  });
  if (!chat) {
    return await RH.CustomError({
      errorClass: CustomError.BadRequestError,
      errorType: ErrorMessages.NotFoundError,
      Field: fields.chat,
    });
  }
  await RH.SendResponse({
    res,
    statusCode: StatusCodes.OK,
    title: "ok",
    value: {
      message: Message,
    },
  });
};

export { createMessage };
