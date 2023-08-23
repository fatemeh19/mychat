import * as Validators from "../validators/index.js";
import * as Services from "../services/dbServices.js";
import * as RH from "../middlewares/ResponseHandler.js";
import * as CustomError from "../errors/index.js";
import ValidationError from "../errors/ValidationError.js";

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
import { objectId } from "../utils/typeConverter.js";
import fileTypeGetter from "../utils/fileTypeIdentifier.js";
import fileCreator from "../utils/fileCreator.js";
import * as consts from "../utils/consts.js";

const createChat = async (body,userId,file) => {
  let profilePic
  const data = await Validators.createChat.validate(body);
  // if type of chat is private
  if (data.chatType == chatType[1]) {
    const chatExists = await Services.findOne("chat", {
      and: [
        { "members.0.memberId": { $in: data.memberIds } },
        { "members.1.memberId": { $in: data.memberIds } },
      ],
      chatType: chatType[1],
    },{},false);

    if (chatExists) {
      throw new CustomError.BadRequestError(
        ErrorMessages.DuplicateError,
        fields.chat
      );
      
    }
  } else {
    let methodParameter = file
      ? file
      : {
          originalname: "default-profile",
          mimetype: "image/jpg",
          path: consts.DEFAULT_PROFILE_PICTURE,
        };
    profilePic = await fileCreator(methodParameter)
    data.profilePic = profilePic._id

    data.owner = userId;
    let primaryLink = {
      name: "primaryLink",
      link: createRandomInviteLink(),
      creator: userId,
    };
    data.inviteLinks = [];
    data.inviteLinks.push(primaryLink);
  }
  let members = [];
  data.memberIds.forEach((memberId) => {
    members.push({
      memberId,
    });
  });

  data["members"] = members;

  const chat = await Services.create(data.chatType, data);
  await Services.updateMany(
    "user",
    {
      _id: { $in: data.memberIds },
    },
    {
      $push: { chats: { chatInfo: chat._id } },
    }
  );
  chat.profilePic = profilePic
  return chat
};

const getChat = async (userId,chatId) => {
 
  const user = await Services.findOne("user", { _id: userId });
  const chat = await Services.findOne("chat", { _id: chatId });
  if (chat.profilePic) {
    chat.profilePic = await Services.findOne("file", { _id: chat.profilePic });
  }
  let addedAt;
  user.chats.forEach((chat) => {
    if (chat.chatInfo.equals(chatId)) {
      addedAt = chat.addedAt;
    }
  });
  
  
  let messageIds = chat.messages.map((message) => message.messageInfo);
  messageIds = await objectId(messageIds)
  const messages = await Services.aggregate("message", [
    {
      $match: {
        _id: { $in: messageIds },
      },
    },
    {
      $lookup: {
        from: "files",
        localField: "content.file",
        foreignField: "_id",
        as: "content.file",
      },
    },
    {$unwind:"$content.file"},
    
    {
      $lookup: {
        from: "users",
        localField: "senderId",
        foreignField: "_id",
        as: "senderInfo",
      },
    },
    {$unwind:"$senderInfo"},
    
    {
      $lookup:{
        from:"files",
        localField:"senderInfo.profilePic",
        foreignField:"_id",
        as:"senderInfo.profilePic"
      }

    },
    {$unwind:"$senderInfo.profilePic"},
    {
      $project: {
        "content.file":1,
        "content.text": 1,
        "senderInfo.name": 1,
        "senderInfo.lastname": 1,
        "senderInfo.profilePic": 1,
        "createdAt": 1,
      },
    },
   
  ]);

console.log(messages)
  let index;
  let i = 0;
  let length = chat.messages.length;
  for (index = 0; index < length; index++) {
    
    if (messages[i].createdAt < addedAt) {
      chat.messages.splice(index, 1);
      index--;
      length = chat.messages.length;
      i++;
      continue;
    }

    chat.messages[index].messageInfo = messages[i];
    i++;
  }

  return chat
};

const getChats = async (userId) => {
  
  const user = await Services.findOne("user", { _id: userId });
  let chatIds = user.chats.map((chat) => chat.chatInfo);
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

  let messageIds = chats.map(
    (chat) => chat.messages[chat.messages.length - 1]?.messageInfo
  );
  messageIds = await objectId(messageIds)
  // const messages = await Services.findMany(
  //   "message",
  //   {
  //     _id: { $in: messageIds },
  //   },
  //   {},
  //   {updatedAt:-1}
  // );
  const messages = await Services.aggregate("message", [
    {
      $match: {
        _id: { $in: messageIds },
      },
    },
    {
      $lookup: {
        from: "files",
        localField: "content.file",
        foreignField: "_id",
        as: "content.file",
      },
    },
    {$unwind:"$content.file"},
    
    {
      $lookup: {
        from: "users",
        localField: "senderId",
        foreignField: "_id",
        as: "senderInfo",
      },
    },
    {$unwind:"$senderInfo"},
    {
      $project: {
        "content.file":1,
        "content.text": 1,
        "senderInfo.name": 1,
        "senderInfo.lastname": 1,
        createdAt: 1,
      },
    },
    {
      $sort: {
        updatedAt: -1,
      },
    },
  ]);

  let index = 0;
  chats.forEach((chat) => {
    if (!chat.messages.length) {
      return;
    }

    chat.messages.splice(0, chat.messages.length - 1);
    if (
      !messages[index] ||
      !chat.messages[0].messageInfo.equals(messages[index]._id)
    ) {
      messages.forEach((message, i) => {
        if (message._id.equals(chat.messages[0].messageInfo)) {
          chat.messages[0].messageInfo = messages[i];
        }
      });
    } else {
      chat.messages[0].messageInfo = messages[index];
      index++;
    }
  });

  return chats
};
const addToChats = async (userId,chatId) => {
  
  await Services.findByIdAndUpdate("user", userId, {
    $push: { chats: { chatInfo: chatId, addedAt: Date.now() } },
  });
};
const pinUnpinChat = async (body,userId,chatId) => {
  
  let data;
  try {
    data = await Validators.pinUnpinChat.validate(body, {
      stripUnknown: true,
      abortEarly: false,
    });
  } catch (errors) {
   throw new ValidationError(errors);
  }

  let updateQuery;
  let op;
  if (data.pin) {
    op = "$push";
    updateQuery = {
      $push: {},
      $set: {},
    };
  } else {
    op = "$pull";
    updateQuery = {
      $pull: {},
      $set: {},
    };
  }
  updateQuery[op]["pinnedChats"] = chatId;

  if (data.allChats) {
    await Services.findByIdAndUpdate("user", userId, updateQuery);
    await Services.findByIdAndUpdate("chat", chatId, {
      $set: { pinned: data.pin },
    });
  } else {
    updateQuery["$set"]["chats.$[chat].pinned"] = data.pin;
    await Services.findByIdAndUpdate("folder", data.folderId, updateQuery, {
      arrayFilters: [{ "chat.chatInfo": chatId }],
    });
  }
 
};

const DeleteChat = async (userId, deleteInfo) => {
  const { chatId, deleteAll } = deleteInfo;
  const chat = await Services.findOne("chat", { _id: chatId });
  const user = await Services.findOne("user", { _id: userId });
  if (deleteAll) {
    if (chat.chatType == "group") {
      if (!chat.owner.equals(userId)) {
        return res.send("no access");
      }
    }
    await Services.deleteOne("chat", { _id: chatId });
    await Services.updateMany(
      "folder",
      {
        "chats.chatInfo": chatId,
      },
      {
        $pull: { chats: { chatInfo: chatId }, pinnedChats: chatId },
      }
    );
    // pinned chats
    const memberIds = chat.members.map((member) => member.memberId);
    await Services.updateMany(
      "user",
      {
        _id: { $in: memberIds },
      },
      {
        $pull: { pinnedChats: chatId, chats: { chatInfo: chatId } },
      }
    );
  } else {
    if (chat.chatType == "group") {
      await Services.findByIdAndUpdate("chat", chatId, {
        $pull: { members: { memberId: userId } },
      });
    }

    await Services.updateMany(
      "folder",
      {
        _id: { $in: user.folders },
      },
      {
        $pull: { chats: { chatInfo: chatId }, pinnedChats: chatId },
      }
    );

    await Services.findByIdAndUpdate("user", userId, {
      $pull: { chats: { chatInfo: chatId }, pinnedChats: chatId },
    });
  }

 
};

const searchChat = async (userId, search) => {
  // const {
  //   params: { search },
  //   user: { userId },
  // } = req;
  const user = await Services.findOne("user", { _id: userId });
  let userChats = user.chats.map((chat) => chat.chatInfo);
  userChats = await objectId(userChats);
  let groupNameRegex1 = new RegExp(`^${search}`, "i");
  let groupNameRegex2 = new RegExp(` ${search}`, "i");
  const result = await Services.aggregate("user", [
    {
      $match: { _id: await objectId(userId) },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        contacts: {
          $filter: {
            input: "$contacts",
            as: "contact",
            cond: {
              $or: [
                {
                  $regexFind: {
                    input: "$$contact.name",
                    regex: groupNameRegex1,
                  },
                },
                {
                  $regexFind: {
                    input: "$$contact.lastname",
                    regex: groupNameRegex1,
                  },
                },
              ],
            },
          },
        },
      },
    },
  ]);
  let contacts = result[0].contacts.map((contact) => contact.userId);
  contacts = await objectId(contacts);
  const chats = await Services.aggregate("chat", [
    {
      $match: {
        _id: { $in: userChats },
      },
    },
    {
      $addFields: {
        returnObject1: {
          $regexFind: { input: "$name", regex: groupNameRegex1 },
        },
      },
    },
    {
      $addFields: {
        returnObject2: {
          $regexFind: { input: "$name", regex: groupNameRegex2 },
        },
      },
    },

    { $unwind: "$members" },
    {
      $lookup: {
        from: "users",
        localField: "members.memberId",
        foreignField: "_id",
        as: "membersInfo",
      },
    },
    { $unwind: "$membersInfo" },
    {
      $addFields: {
        returnObject3: {
          $regexFind: { input: "$membersInfo.name", regex: groupNameRegex1 },
        },
      },
    },
    {
      $addFields: {
        returnObject4: {
          $regexFind: {
            input: "$membersInfo.lastname",
            regex: groupNameRegex1,
          },
        },
      },
    },

    // Group back to arrays
    {
      $group: {
        name: { $first: "$name" },
        obj1: { $first: "$returnObject1" },
        obj2: { $first: "$returnObject2" },
        chatType: { $first: "$chatType" },
        _id: "$_id",
        members: { $push: "$members" },
        membersInfo: { $push: "$membersInfo" },
      },
    },

    {
      $project: {
        _id: 1,
        name: 1,
        chatType: 1,
        obj1: 1,
        obj2: 1,
        membersInfo: {
          $filter: {
            input: "$membersInfo",
            as: "memberInfo",
            cond: {
              $and: [
                {
                  $or: [
                    {
                      $regexFind: {
                        input: "$$memberInfo.name",
                        regex: groupNameRegex1,
                      },
                    },
                    {
                      $regexFind: {
                        input: "$$memberInfo.lastname",
                        regex: groupNameRegex1,
                      },
                    },
                    {
                      $regexFind: {
                        input: "$$memberInfo.username",
                        regex: groupNameRegex1,
                      },
                    },
                    {
                      $in: ["$$memberInfo._id", contacts],
                    },
                  ],
                },
                { $ne: ["$$memberInfo._id", await objectId(userId)] },
                { $eq: ["$chatType", "private"] },
              ],
            },
          },
        },
      },
    },
  ]);

  for (let index = 0; index < chats.length; index++) {
    if (
      !chats[index].obj1 &&
      !chats[index].obj2 &&
      !chats[index].membersInfo.length
    ) {
      chats.splice(index, 1);
      index--;
    }
  }
  // chats.forEach((chat, index) => {
  //   if (!chat.obj1 && !chat.obj2 && !chat.membersInfo.length) {
  //     chats.splice(index, 1);
  //   }
  // });
  return chats;
  // RH.SendResponse({
  //   res,
  //   statusCode: StatusCodes.OK,
  //   title: "ok",
  //   value: {
  //     chats,
  //   },
  // });
};

export {
  addToChats,
  DeleteChat,
  pinUnpinChat,
  createChat,
  getChat,
  getChats,
  searchChat,
};
