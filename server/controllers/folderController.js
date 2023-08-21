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

const createFolder = async (userId,body) => {
  
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

  return newFolder
};

const addRemoveChat = async (body,folderId) => {
  
  
  const {chatId, add } = body

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
  
};

const deleteFolder = async (userId,folderId) => {
  
  await Services.deleteOne("folder", { _id: folderId });
  const updated = await Services.findByIdAndUpdate(
    "user",
    userId,
    {
      $pull: { folders: folderId },
    },
    { new: true }
  );
  
};

const getFolder = async (folderId) => {
 
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

  // const messageIds = folder.chats.map(
  //   (chat) =>
  //     chat.chatInfo?.messages[chat.chatInfo.messages.length - 1]?.messageInfo
  // );
  let messageIds = []
  folder.chats.forEach(chat => {
    if (!chat.messages.length) {
      return;
    }
    messageIds.push(chat.chatInfo?.messages[chat.chatInfo.messages.length - 1]?.messageInfo)

  });
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

  return folder
};

const getFolders = async (userId) => {
  
  const user = await Services.findOne("user", { _id: userId }, { folders: 1 });
  const folders = await Services.findMany("folder", {
    _id: {
      $in: user.folders,
    },
  });

  return folders
};

const editFolder = async (body,folderId) => {
  
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


};

export {
  editFolder,
  deleteFolder,
  addRemoveChat,
  createFolder,
  getFolder,
  getFolders,
};
