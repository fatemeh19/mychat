import * as Validators from "../validators/index.js";
import * as Services from "../services/index.js";
import * as RH from "../middlewares/ResponseHandler.js";
import * as CustomError from "../errors/index.js";
import ErrorMessages from "../messages/errors.js";
import messages from "../messages/messages.js";
import fields from "../messages/fields.js";
import { StatusCodes } from "http-status-codes";
import Chat from "../models/Chat.js";
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

const getChat = async(req, res) =>{
  // const { memberIds } = req.body;
  const {userId, contactId} = req.params
  const memberIds = [userId, contactId]
  
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
  await RH.SendResponse({
    res,
    statusCode: StatusCodes.OK,
    title: "ok",
    value: {
      chat,
    },
  });
}


export { createChat , getChat};
