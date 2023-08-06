import * as Validators from "../validators/index.js";
import * as Services from "../services/index.js";
import * as RH from "../middlewares/ResponseHandler.js";
import * as CustomError from "../errors/index.js";
import ErrorMessages from "../messages/errors.js";
import fields from "../messages/fields.js";
import { StatusCodes } from "http-status-codes";
import message from "../models/message.js";
import { chatSearchType, chatType } from "../utils/enums.js";
import Group from "../models/Group.js";
import crypto from "crypto";
import "../utils/loadEnv.js";
import createRandomInviteLink from "../utils/createInviteLink.js";
import indexFinder from "../utils/indexFinder.js";
const createChat = async (req, res) => {
  const {
    body: body,
    user: { userId },
    file,
  } = req;
  const data = await Validators.createChat.validate(body);
  // if type of chat is group
  if (data.chatType == chatType[1]) {
    const chatExists = await Services.Chat.getChat({
      memberIds: { $size: 2, $all: data.memberIds },
      chatType: chatType[1],
    });

    if (chatExists) {
      await RH.CustomError({
        errorClass: CustomError.BadRequestError,
        errorType: ErrorMessages.DuplicateError,
        Field: fields.chat,
      });
    }
  } else {
    if (file) {
      data.profilePic = file.path;
    }
    data.owner = userId;
    let primaryLink = {
      name: "primaryLink",
      link: createRandomInviteLink(),
      creator: userId,
    };
    data.inviteLinks = [];
    data.inviteLinks.push(primaryLink);
  }

  const chat = await Services.Chat.createChat(data);
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
  const {
    params: { id: chatId },
  } = req;

  const chat = await Services.Chat.getChat({ _id: chatId });

  if (!chat) {
    await RH.CustomError({
      errorClass: CustomError.BadRequestError,
      errorType: ErrorMessages.NotFoundError,
      Field: fields.chat,
    });
  }
  const messageIds = chat.messages.map((message) => message.messageInfo);

  const messages = await Services.Message.getMessages({
    _id: { $in: messageIds },
  });

  const messageIdss = messages.map((message) => message._id);
  // if()
  chat.messages.forEach((message, index) => {
    let messageIndex = indexFinder(
      0,
      messageIdss.length,
      messageIdss,
      message.messageInfo
    );
    message.messageInfo = messages[messageIndex];
  });

  await RH.SendResponse({
    res,
    statusCode: StatusCodes.OK,
    title: "ok",
    value: {
      chat,
    },
  });
  // }
};

const getChats = async (req, res) => {
  const {
    user: { userId },
  } = req;
  const chats = await Services.Chat.getChats(
    { memberIds: userId },
    "",
    "-updatedAt"
  );

  const messageIds = chats.map(
    (chat) => chat.messages[chat.messages.length - 1]?.messageInfo
  );
  const messages = await Services.Message.getMessages(
    {
      _id: { $in: messageIds },
    },
    "",
    "-updatedAt"
  );
  
  let index = 0
  chats.forEach((chat) => {
    if (!chat.messages.length) {
      return;
    }
    chat.messages.splice(0, chat.messages.length - 1);
    chat.messages[0].messageInfo = messages[index];
    index++
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

const pinUnpinChat = async (req, res) => {
  const {body, params:{chatId}} = req
};

export { createChat, getChat, getChats };
