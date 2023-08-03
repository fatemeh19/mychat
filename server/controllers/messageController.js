import * as Validators from "../validators/index.js";
import * as Services from "../services/index.js";
import * as RH from "../middlewares/ResponseHandler.js";
import * as CustomError from "../errors/index.js";
import ErrorMessages from "../messages/errors.js";
import messages from "../messages/messages.js";
import fields from "../messages/fields.js";
import { StatusCodes } from "http-status-codes";
import * as fileController from "../utils/file.js";

import { objectId } from "../utils/typeConverter.js";
const createMessage = async (req, res) => {
  const {
    params: { chatId },
    body: message,
    file,
  } = req;
  let url =
    file && message.content.contentType != "text" ? file.path : undefined;
  let originalName =
    file && message.content.contentType != "text"
      ? req.file.originalname
      : undefined;

  let newMessage = {
    reply: {
      isReplied: Boolean(message?.reply?.isReplied),
      messageId: message?.reply?.messageId,
    },
    content: {
      contentType: message.content.contentType,
      text: message.content.text,
      url: url,
      originalName,
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
    const repliedMessage = await Services.Chat.aggregateChats([
      {
        $match: { _id: await objectId(chatId) },
      },
      {
        $project: {
          messages: 1,
          messages: {
            $filter: {
              input: "$messages",
              as: "message",
              cond: {
                $eq: [
                  "$$message._id",
                  await objectId(newMessage.reply.messageId),
                ],
              },
            },
          },
        },
      },
    ]);
    if (!repliedMessage[0].messages.length) {
      return await RH.CustomError({
        errorClass: CustomError.BadRequestError,
        errorType: ErrorMessages.NotFoundError,
        Field: fields.message,
      });
    }
  }

  const Message = await Services.Message.createMessage(newMessage);
  const chat = await Services.Chat.findAndUpdateChat(
    chatId,
    {
      $push: { messages: { messageId: Message._id } },
    },
    { new: true }
  );
  if (!chat) {
    return await RH.CustomError({
      errorClass: CustomError.BadRequestError,
      errorType: ErrorMessages.NotFoundError,
      Field: fields.chat,
    });
  }
  let msg = chat.messages.pop();
  msg.messageId = Message;
  await RH.SendResponse({
    res,
    statusCode: StatusCodes.OK,
    title: "ok",
    value: {
      message: msg,
    },
  });
};
const DeleteMessage = async (userId, deleteInfo) => {
  let { chatId, messageIds, deleteAll } = deleteInfo;

  messageIds = await objectId(messageIds);

  let notForwardedMessages = await Services.Chat.aggregateChats([
    { $match: { _id: await objectId(chatId) } },
    {
      $project: {
        messages: 1,
        messages: {
          $filter: {
            input: "$messages",
            as: "message",
            cond: {
              $and: [
                {
                  $eq: ["$$message.forwarded.isForwarded", false],
                },
                {
                  $in: ["$$message._id", messageIds],
                },
              ],
            },
          },
        },
      },
    },
  ]);
  if (notForwardedMessages.length) {
    notForwardedMessages = notForwardedMessages[0].messages.map(
      (message) => message.messageId
    );
  }

  let result;
  if (deleteAll) {
    const messages = await Services.Message.getMessages({
      _id: { $in: notForwardedMessages },
    });

    messages.forEach((message) => {
      if (message.content.url) {
        fileController.deleteFile(message.content.url);
      }
    });
    Services.Message.deleteMessage({
      _id: { $in: notForwardedMessages },
    });

    Services.Chat.findAndUpdateChat(chatId, {
      $pull: { messages: { _id: { $in: messageIds } } },
    });
  } else {
    result = await Services.Chat.findAndUpdateChat(
      chatId,
      {
        $push: { "messages.$[message].deletedIds": userId },
      },
      {
        arrayFilters: [
          {
            "message._id": {
              $in: messageIds,
            },
          },
        ],
      }
    );
  }

  // res.status(200).send("OK");
};
const forwardMessage = async (req, res) => {
  const {
    params: { chatId },
    body: { messageIds },
    user: { userId },
  } = req;

  const forwardedMessages = await Services.Message.getMessages({
    _id: { $in: messageIds },
  });
  const messages = [];
  forwardedMessages.forEach((forwardedMessage) => {
    messages.push({
      messageId: forwardedMessage._id,
      forwarded: {
        isForwarded: true,
        by: userId,
      },
    });
  });

  const chat = await Services.Chat.findAndUpdateChat(
    chatId,
    {
      $push: { messages: { $each: messages } },
    },
    { new: true }
  );
  const forwardInfo = {
    forwardedMessages,
    forwardedBy: userId,
    chat,
  };
  res.send(forwardInfo);
};
const pinUnPinMessage = async (userId, pinnedInfo) => {
  let { messageId, chatId, pin } = pinnedInfo;
  // check chat Id and message ID exists
  let op;
  let pinStat;
  let updateQuery;
  pin = Number(pin);
  if (pin) {
    op = "$push";
    pinStat = {
      pinned: true,
      by: userId,
    };
    updateQuery = { $push: {}, $set: {} };
  } else {
    op = "$pull";
    pinStat = {
      pinned: false,
    };
    updateQuery = { $pull: {}, $set: {} };
  }
  updateQuery[op]["pinnedMessages"] = messageId;
  updateQuery["$set"]["messages.$[message].pinStat"] = pinStat;

  const chat = await Services.Chat.findAndUpdateChat(chatId, updateQuery, {
    arrayFilters: [{ "message._id": { $eq: messageId } }],
    new: true,
  });
};
export { pinUnPinMessage, forwardMessage, createMessage, DeleteMessage };
