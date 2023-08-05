import * as Validators from "../validators/index.js";
import * as Services from "../services/index.js";
import * as RH from "../middlewares/ResponseHandler.js";
import * as CustomError from "../errors/index.js";
import ErrorMessages from "../messages/errors.js";
import messages from "../messages/messages.js";
import fields from "../messages/fields.js";
import { StatusCodes } from "http-status-codes";
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
  const newFolder = await Services.Folder.createFolder({
    name: data.name,
    chats,
  });

  const updated = await Services.User.findAndUpdateUser(
    userId,
    {
      $push: {
        folders: newFolder._id
      },
    },
    { new: true }
  );


  RH.SendResponse({ res, statusCode: StatusCodes.OK, title: "ok" });
};

const addToFolder = async (req, res) => {
  // tekrari chat
  const {
    params: { chatId, folderId },
    // user: { userId },
  } = req;

  const updated = await Services.Folder.findAndUpdateFolder(
    folderId,
    {
      $push: { chats: { chatInfo: chatId } },
    },
    {
      new: true,
    }
  );
  res.send(updated);
};

const removeFromFolder = async (req, res) => {
  const {
    params: { chatId, folderId },
    user: { userId },
  } = req;

  const updated = await Services.Folder.findAndUpdateFolder(
    folderId,
    {
      $pull: { chats: { chatInfo: chatId } },
    },
    {
      new: true,
    }
  );
  res.send(updated);
};

const deleteFolder = async (req, res) => {
  const {
    params: { id: folderId },
    user: { userId },
  } = req;
  await Services.Folder.deleteFolder({_id:folderId})
  const updated = await Services.User.findAndUpdateUser(
    userId,
    {
      $pull: { folders:  folderId  },
    },
    { new: true }
  );
  res.send(updated);
};

const getFolder = async (req, res) => {
  const {
    params: { id: folderId },
    user: { userId },
  } = req;
  
  const folder = await Services.Folder.findFolder({_id:folderId})
  // const updated = await Services.User.aggregateUsers([
  //   { $match: { _id: await objectId(userId) } },
  //   {
  //     $project: {
  //       folders: 1,
  //       folders: {
  //         $filter: {
  //           input: "$folders",
  //           as: "folder",
  //           cond: {
  //             $eq: ["$$folder._id", await objectId(folderId)],
  //           },
  //         },
  //       },
  //     },
  //   },
  // ]);
  let chatIds = folder.chats;
  chatIds = chatIds.map((chat) => chat.chatInfo);

  const chats = await Services.Chat.getChats({
    _id: { $in: chatIds },
  });

  folder.chats.forEach((chat, index) => {
    chat.chatInfo = chats[index];
  });

  const messageIds = folder.chats.map(
    (chat) =>
      chat.chatInfo?.messages[chat.chatInfo.messages.length - 1]?.messageInfo
  );
  const messages = await Services.Message.getMessages(
    {
      _id: { $in: messageIds },
    },
    ""
  );
  chats.forEach((chat, index) => {
    console.log(chat)
    if (!chat.messages.length) {
      return;
    }
    chat.messages.splice(0, chat.messages.length - 1);
    chat.messages[0].messageInfo = messages[index];
  });

  folder.chats.forEach((chat, index) => {
    chat.chatInfo = chats[index]
  });

  res.send(folder);
};

export { deleteFolder, removeFromFolder, addToFolder, createFolder, getFolder };
