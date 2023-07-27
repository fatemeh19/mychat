import Message from "../models/message.js";
import * as Validators from "../validators/index.js";
import * as Services from "../services/index.js";
import * as RH from "../middlewares/ResponseHandler.js";
import * as CustomError from "../errors/index.js";
import ErrorMessages from "../messages/errors.js";
import messages from "../messages/messages.js";
import fields from "../messages/fields.js";
import { StatusCodes } from "http-status-codes";
import message from "../models/message.js";
import * as fileController from "../utils/file.js"
const createMessage = async (req, res) => {

  const {
    params: { chatId },
    body: message,
    file,
  } = req;
  let url = file && message.content.contentType != "text" ? file.path : undefined
  let originalName = file && message.content.contentType != "text" ? req.file.originalname  : undefined

  let newMessage = {
    reply: {
      isReplied: Boolean(message?.reply?.isReplied),
      messageId: message?.reply?.messageId,
    },
    content: {
      contentType: message.content.contentType,
      text: message.content.text,
      url: url,
      originalName
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
    if (!repliedMessage) {
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
const DeleteMessage = async (userId, deleteInfo) => {
  const { chatId, messageIds, deleteAll } = deleteInfo;
  
  if (deleteAll) {
    const messages = await Services.Message.getMessages({_id:{$in: messageIds}})
    
    messages.forEach(message => {
      if(message.content.url){
        fileController.deleteFile(message.content.url)
      }
      
    }); 
    Services.Message.deleteMessage({
      _id: { $in: messageIds },
    });


    Services.Chat.findAndUpdateChat(chatId, {
      $pullAll: {
        messages: messageIds,
      },
    });
  } else {
    await Services.Message.updateMessages(
      { _id: { $in: messageIds } },
      { $push: { deletedIds: userId } }
    );
  }

  // res.status(200).send("OK");
};

export { createMessage, DeleteMessage };
