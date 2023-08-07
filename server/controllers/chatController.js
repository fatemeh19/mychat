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
      and: [
        { "members.0.memberId": { $in: data.memberIds } },
        { "members.1.memberId": { $in: data.memberIds } },
      ],
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
  let members = [];
  // console.log(data.memberIds)
  data.memberIds.forEach((memberId) => {
    members.push({
      memberId,
    });
    // console.log(members)
  });

  data["members"] = members;
  console.log(data);

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
    user: { userId },
    params: { id: chatId },
  } = req;

  const chat = await Services.Chat.getChat({ _id: chatId });
  let joinedAt;
  chat.members.forEach((member) => {
    if (member.memberId.equals(userId)) {
      joinedAt = member.joinedAt;
    }
  });
  if (!chat) {
    await RH.CustomError({
      errorClass: CustomError.BadRequestError,
      errorType: ErrorMessages.NotFoundError,
      Field: fields.chat,
    });
  }
  // chat.messages.forEach((message, index) => {
  //   console.log("message.createdAt=",message.createdAt)
  //   console.log("joined=",joinedAt)

  //   if(message.createdAt<joinedAt){
  //     chat.messages.splice(index,1)
  //   }

  // });
  const messageIds = chat.messages.map((message) => message.messageInfo);

  const messages = await Services.Message.getMessages({
    _id: { $in: messageIds },
    // createdAt: { $gte: joinedAt },
  });

  const messageIdss = messages.map((message) => message._id);
 
  let index;
  let i = 0
  let length = chat.messages.length;
  for (index = 0; index < length; index++) {
    if (messages[i].createdAt < joinedAt) {
      chat.messages.splice(index, 1);
      index--;
      length = chat.messages.length;
      i++
      continue;
    }
    let messageIndex = indexFinder(
      0,
      messageIdss.length,
      messageIdss,
      chat.messages[index].messageInfo
    );
    chat.messages[index].messageInfo = messages[messageIndex];
    i++
  }

  // chat.messages.forEach((message) => {
  //   // console.log(index)
  //   console.log(chat.messages)
  //   // console.log("messages[index].createdAt=",messages[index].createdAt)
  //   // console.log("joinedAt=",joinedAt)
  //   // console.log(messages[index]._id)
  //   if(messages[index].createdAt<joinedAt){
  //     chat.messages.splice(index,1)
  //     index--

  //   }
  //     let messageIndex = indexFinder(
  //       0,
  //       messageIdss.length,
  //       messageIdss,
  //       message.messageInfo
  //     );
  //     message.messageInfo = messages[messageIndex];
  //     index++

  //   // console.log(chat.messages)

  // });

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
    { "members.memberId": userId },
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

  let index = 0;
  chats.forEach((chat) => {
    if (!chat.messages.length) {
      return;
    }
    chat.messages.splice(0, chat.messages.length - 1);
    chat.messages[0].messageInfo = messages[index];
    index++;
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
  const {
    body,
    params: { id: chatId },
    user: { userId },
  } = req;
  let data;
  try {
    data = await Validators.pinUnpinChat.validate(body, {
      stripUnknown: true,
      abortEarly: false,
    });
  } catch (err) {
    await RH.CustomError({ err, errorClass: CustomError.ValidationError });
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
    await Services.User.findAndUpdateUser(userId, updateQuery);
    await Services.Chat.findAndUpdateChat(chatId, {
      $set: { pinned: data.pin },
    });
  } else {
    updateQuery["$set"]["chats.$[chat].pinned"] = data.pin;
    await Services.Folder.findAndUpdateFolder(data.folderId, updateQuery, {
      arrayFilters: [{ "chat.chatInfo": chatId }],
    });
  }
  await RH.SendResponse({
    res,
    statusCode: StatusCodes.OK,
    title: "ok",
  });
};



export { pinUnpinChat, createChat, getChat, getChats };
