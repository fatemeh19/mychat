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
      chat: chatId,
    };
    chats.push(chat);
  });

  const updated = await Services.User.findAndUpdateUser(
    userId,
    {
      $push: {
        folders: {
          name: data.name,
          chats,
        },
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
    user: { userId },
  } = req;

  const updated = await Services.User.findAndUpdateUser(
    userId,
    {
      $push: { "folders.$[folder].chats": { chat: chatId } },
    },
    {
      arrayFilters: [{ "folder._id": { $eq: folderId } }],
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

  const updated = await Services.User.findAndUpdateUser(
    userId,
    {
      $pull: { "folders.$[folder].chats": { chat: chatId } },
    },
    {
      arrayFilters: [{ "folder._id": { $eq: folderId } }],
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
  const updated = await Services.User.findAndUpdateUser(
    userId,
    {
      $pull: { folders: { _id: folderId } },
    },
    { new: true }
  );
  res.send(updated);
};

const getFolder = async (req, res) => {
  const {
    params: { id:folderId },
    user: { userId },
  } = req;

  const updated = await Services.User.aggregateUsers([
    {$match:{_id:await objectId(userId)}},
    {$project:{
        folders:1,
        folders:{
            $filter:{
                input:"$folders",
                as:"folder",
                cond:{
                    $eq:["$$folder._id",await objectId(folderId)]
                }
            }
        }
    }}
  ])
  let chatIds =updated[0].folders[0].chats
  chatIds = chatIds.map((chat)=>chat.chat)

  const chats = await Services.Chat.getChats({
    _id:{$in:chatIds}
  })

  updated[0].folders[0].chats.forEach((chat,index)=>{
    chat.chat = chats[index]
  })



  res.send(updated[0].folders[0].chats)
  


};

export { deleteFolder, removeFromFolder, addToFolder, createFolder,getFolder };
