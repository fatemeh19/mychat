import * as Validators from "../validators/index.js";
import * as Services from "../services/dbServices.js";
import * as RH from "../middlewares/ResponseHandler.js";
import * as CustomError from "../errors/index.js";
import ErrorMessages from "../messages/errors.js";
import messages from "../messages/messages.js";
import fields from "../messages/fields.js";
import { StatusCodes } from "http-status-codes";
import folder from "../models/folder.js";
import { objectId } from "../utils/typeConverter.js";

const createFolder = async (req, res) => {
  const {
    user: { userId },
    body,
  } = req;
  let data;
  try {
    data = await Validators.createFolder.validate(body, {
      stripUnknown: true,
      abortEarly: false,
    });
  } catch (err) {
    await RH.CustomError({ err, errorClass: CustomError.ValidationError });
  }

  let chats = [];
  data.chatIds.forEach((chatId) => {
    let chat = {
      chatInfo: chatId,
    };
    chats.push(chat);
  });
  const newFolder = await Services.create("folder", {
    name: data.name,
    chats,
  });

  const updated = await Services.findByIdAndUpdate(
    "user",
    userId,
    {
      $push: {
        folders: newFolder._id,
      },
    },
    { new: true }
  );

  RH.SendResponse({
    res,
    statusCode: StatusCodes.OK,
    value: {
      folderId: newFolder._id,
    },
    title: "ok",
  });
};

const addRemoveChat = async (req, res) => {
  // tekrari chat
  let {
    body: { chatId, add },
    params: { folderId },
    // user: { userId },
  } = req;

  let updateQuery;
  if (add) {
    updateQuery = {
      $push: { chats: { chatInfo: chatId } },
    };
  } else {
    updateQuery = {
      $pull: { chats: { chatInfo: chatId } },
    };
  }

  await Services.findByIdAndUpdate("folder", folderId, updateQuery, {
    new: true,
  });
  RH.SendResponse({
    res,
    statusCode: StatusCodes.OK,
    title: "ok",
  });
};

const deleteFolder = async (req, res) => {
  const {
    params: { id: folderId },
    user: { userId },
  } = req;
  await Services.deleteOne("folder", { _id: folderId });
  const updated = await Services.findByIdAndUpdate(
    "user",
    userId,
    {
      $pull: { folders: folderId },
    },
    { new: true }
  );
  RH.SendResponse({
    res,
    statusCode: StatusCodes.OK,
    title: "ok",
  });
};

const getFolder = async (req, res) => {
  const {
    params: { id: folderId },
  } = req;

  const folder = await Services.findOne("folder", { _id: folderId });

  let chatIds = folder.chats;
  chatIds = chatIds.map((chat) => chat.chatInfo);
  chatIds = await objectId(chatIds);
  const chats = await Services.aggregate("chat", [
    { $match: { _id: { $in: chatIds } } },
    {
      $lookup: {
        from: "files",
        localField: "profilePic",
        foreignField: "_id",
        as: "profilePic",
      },
    },
    { $unwind: "$profilePic" },
    {
      $sort: {
        updatedAt: -1,
      },
    },
  ]);

  folder.chats.forEach((chat, index) => {
    chat.chatInfo = chats[index];
  });

  const messageIds = folder.chats.map(
    (chat) =>
      chat.chatInfo?.messages[chat.chatInfo.messages.length - 1]?.messageInfo
  );
  const messages = await Services.findMany(
    "message",
    {
      _id: { $in: messageIds },
    },
    {},
    { updatedAt: -1 }
  );
  let index = 0;
  chats.forEach((chat) => {
    if (!chat.messages.length) {
      return;
    }
    chat.messages.splice(0, chat.messages.length - 1);
    chat.messages[0].messageInfo = messages[index];
    index++;
  });

  folder.chats.forEach((chat, index) => {
    chat.chatInfo = chats[index];
  });

  RH.SendResponse({
    res,
    statusCode: StatusCodes.OK,
    title: "ok",
    value: { folder },
  });
};

const getFolders = async (req, res) => {
  const {
    user: { userId },
  } = req;
  const user = await Services.findOne("user", { _id: userId }, { folders: 1 });
  const folders = await Services.findMany("folder", {
    _id: {
      $in: user.folders,
    },
  });

  RH.SendResponse({
    res,
    statusCode: StatusCodes.OK,
    title: "ok",
    value: { folders },
  });
};

const editFolder = async (req, res) => {
  const {
    params: { id: folderId },
    body,
  } = req;
  let data;
  try {
    data = await Validators.createFolder.validate(body, {
      stripUnknown: true,
      abortEarly: false,
    });
  } catch (err) {
    await RH.CustomError({ err, errorClass: CustomError.ValidationError });
  }

  let chats = [];
  data.chatIds.forEach((chatId) => {
    let chat = {
      chatInfo: chatId,
    };
    chats.push(chat);
  });
  const updated = await Services.findByIdAndUpdate(
    "folder",
    folderId,
    {
      name: data.name,
      chats: chats,
    },
    {
      new: true,
    }
  );

  RH.SendResponse({ res, statusCode: StatusCodes.OK, title: "ok" });

  // RH.SendResponse({ res, statusCode: StatusCodes.OK, title: "ok" });
};

export {
  editFolder,
  deleteFolder,
  addRemoveChat,
  createFolder,
  getFolder,
  getFolders,
};
