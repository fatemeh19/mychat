import * as Validators from "../validators/index.js";
import * as Services from "../services/index.js";
import * as RH from "../middlewares/ResponseHandler.js";
import * as CustomError from "../errors/index.js";
import ErrorMessages from "../messages/errors.js";
import messages from "../messages/messages.js";
import fields from "../messages/fields.js";
import { StatusCodes } from "http-status-codes";
import folder from "../models/folder.js";

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
        folders: newFolder._id,
      },
    },
    { new: true }
  );

  RH.SendResponse({ res, statusCode: StatusCodes.OK, title: "ok" });
};

const addRemoveChat = async (req, res) => {
  // tekrari chat
  let {
    params: { chatId, folderId, add },
    // user: { userId },
  } = req;
  add = Number(add);
  let updateQuery
  if (add) {
    updateQuery = {
      $push:{chats:{ chatInfo: chatId }}
    }
 
  } else {
    updateQuery = {
      $pull:{chats:{ chatInfo: chatId }}
    }
  }


  await Services.Folder.findAndUpdateFolder(folderId, updateQuery, {
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
  await Services.Folder.deleteFolder({ _id: folderId });
  const updated = await Services.User.findAndUpdateUser(
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

  const folder = await Services.Folder.findFolder({ _id: folderId });

  let chatIds = folder.chats;
  chatIds = chatIds.map((chat) => chat.chatInfo);

  const chats = await Services.Chat.getChats(
    {
      _id: { $in: chatIds },
    },
    "",
    "-updatedAt"
  );

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
    "",
    "-updatedAt"
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
  const { user:{userId} } = req;
  const user = await Services.User.findUser({_id:userId},"folders")
  const folders = await Services.Folder.findFolders({
    _id:{
      $in:user.folders
    }
  })

  RH.SendResponse({
    res,
    statusCode: StatusCodes.OK,
    title: "ok",
    value: { folders },
  });
  
};

const editFolder = async (req, res)=>{
  const {
    params:{id:folderId},
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
  const updated = await Services.Folder.findAndUpdateFolder(folderId,{
    name:data.name,
    chats:chats
  },{
    new:true
  })

 
  res.send(updated)

  // RH.SendResponse({ res, statusCode: StatusCodes.OK, title: "ok" });


}

export {editFolder, deleteFolder, addRemoveChat, createFolder, getFolder,getFolders };
