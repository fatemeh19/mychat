import * as Validators from "../validators/index.js";
import * as Services from "../services/dbServices.js";
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
  console.log(file);
  let url = file ? file.path : undefined;
  let originalName = file ? req.file.originalname : undefined;

  let newMessage = {
    reply: {
      isReplied: Boolean(message?.reply?.isReplied),
      messageId: message?.reply?.messageId,
    },
    content: {
      contentType: file ? file.fileType : "text",
      text: message.content?.text,
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
    const repliedMessage = await Services.aggregate("chat", [
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

  const Message = await Services.create("message", newMessage);
  const chat = await Services.findByIdAndUpdate(
    "chat",
    chatId,
    {
      $push: { messages: { messageInfo: Message._id } },
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
  msg.messageInfo = Message;
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

  let notForwardedMessages = await Services.aggregate("chat", [
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
    const messages = await Services.findMany("message", {
      _id: { $in: notForwardedMessages },
    });

    messages.forEach((message) => {
      if (message.content.url) {
        fileController.deleteFile(message.content.url);
      }
    });
    Services.deleteMany("message", {
      _id: { $in: notForwardedMessages },
    });

    Services.findByIdAndUpdate("chat", chatId, {
      $pull: { messages: { _id: { $in: messageIds } } },
    });
  } else {
    result = await Services.findByIdAndUpdate(
      "chat",
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

  const forwardedMessages = await Services.findMany("message", {
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

  const chat = await Services.findByIdAndUpdate(
    "chat",
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
  pin = Boolean(pin);
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

  await Services.findByIdAndUpdate("chat", chatId, updateQuery, {
    arrayFilters: [{ "message._id": { $eq: messageId } }],
    new: true,
  });
};
const editMessage = async (req, res) => {
  const {
    body,
    file,
    params: { id: messageId },
  } = req;
  let data;
  try {
    data = await Validators.editMessage.validate(body, {
      stripUnknown: true,
      abortEarly: false,
    });
  } catch (err) {
    return RH.CustomError({ err, errorClass: CustomError.ValidationError });
  }
  // if message exists
  const message = await Services.findOne("message", { _id: messageId });

  if (
    (message.content.contentType == "text" && file) ||
    (message.content.contentType != "text" && !file)
  ) {
    // error
    return RH.CustomError({
      errorClass: CustomError.BadRequestError,
      errorType: ErrorMessages.ContentMatchError,
      Field: fields.file,
    });
  }
  if (!message.content.text) {
    if (!file) {
      return RH.CustomError({
        errorClass: CustomError.BadRequestError,
        errorType: ErrorMessages.NoFileFoundError,
        Field: fields.file,
      });
      // error
    }
  }
  if (file) {
    fileController.deleteFile(message.content.url);
    data.content.url = file.path;
    data.content.contentType = file ? file.fileType : "text";
    data.content.originalName = file.originalname;
  }

  message.content = data.content;
  message.edited = true;
  const editedMessage = await message.save();
  await RH.SendResponse({
    res,
    statusCode: StatusCodes.OK,
    title: "ok",
    value: {
      message: editedMessage,
    },
  });
};

const searchMessage = async (req, res) => {
  const {
    params: { chatId, search },
  } = req;
  const chat = await Services.findOne("chat", { _id: chatId }, { messages: 1 });
  let messageIds = chat.messages.map((message) => message.messageInfo);
  messageIds = await objectId(messageIds);
  const messages = await Services.aggregate("message", [
    {
      $match: {
        _id: { $in: messageIds },
        "content.text": { $regex: search, $options: "i" },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "senderId",
        foreignField: "_id",
        as: "senderInfo",
      },
    },
    {
      $project: {
        _id: 1,
        "content.text": 1,
        "senderInfo.name": 1,
        "senderInfo.lastname": 1,
        "senderInfo.profilePic": 1,
         createdAt: 1,
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
  ]);
  RH.SendResponse({res, statusCode:StatusCodes.OK,title:"ok", value:{
    messages
  }})
};
export {
  editMessage,
  pinUnPinMessage,
  forwardMessage,
  createMessage,
  DeleteMessage,
  searchMessage,
};
