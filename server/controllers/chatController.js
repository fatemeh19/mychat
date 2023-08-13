import * as Validators from "../validators/index.js";
import * as Services from "../services/dbServices.js";
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
  // if type of chat is private
  if (data.chatType == chatType[1]) {
    const chatExists = await Services.findOne('chat',{
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
  

  const chat = await Services.create(data.chatType,data);
  await Services.updateMany('user',
    {
      _id: { $in: data.memberIds },
    },
    {
      $push: {chats:{chatInfo:chat._id} },
    }
  );
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
  const user = await Services.findOne('user',{_id:userId})
  const chat = await Services.findOne('chat',{ _id: chatId });
  let addedAt;
  user.chats.forEach((chat) => {
    if (chat.chatInfo.equals(chatId)) {
      addedAt = chat.addedAt;
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

  const messages = await Services.findMany('message',{
    _id: { $in: messageIds },
    // createdAt: { $gte: joinedAt },
  });

  const messageIdss = messages.map((message) => message._id);

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
  const user = await Services.findOne('user',{_id:userId})
  const chatIds = user.chats.map((chat)=>chat.chatInfo)
  const chats = await Services.findMany('chat',
    { _id: {$in:chatIds} },
    {},
    {updatedAt:-1}
  );

  const messageIds = chats.map(
    (chat) => chat.messages[chat.messages.length - 1]?.messageInfo
  );
  const messages = await Services.findMany('message',
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
    if(!messages[index] || !chat.messages[0].messageInfo.equals(messages[index]._id) ){
      messages.forEach((message,i)=>{
        if(message._id.equals(chat.messages[0].messageInfo)){
          chat.messages[0].messageInfo = messages[i];

        }
      })
    }else{
      chat.messages[0].messageInfo = messages[index];
      index++;

    }
    
  });
  
  // let index;
  // let i = 0;
  // let length = chats.length;
  // for (index = 0; index < length; index++) {
  //   if (messages[i].createdAt < addedAt) {
  //     chat.messages.splice(index, 1);
  //     index--;
  //     length = chat.messages.length;
  //     i++;
  //     continue;
  //   }
  //   let messageIndex = indexFinder(
  //     0,
  //     messageIdss.length,
  //     messageIdss,
  //     chat.messages[index].messageInfo
  //   );
  //   chat.messages[index].messageInfo = messages[messageIndex];
  //   i++;
  // }








  await RH.SendResponse({
    res,
    statusCode: StatusCodes.OK,
    title: "ok",
    value: {
      chats,
    },
  });
};
const addToChats = async (req, res)=>{
  const {params:{id:chatId}, user:{userId}} = req

  // if chat does not exists
  // error

  await Services.findByIdAndUpdate('user',userId,{
    $push:{chats:{chatInfo:chatId , addedAt:Date.now()}}
  })
  RH.SendResponse({res,statusCode:StatusCodes.OK,title:"ok"})



}
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
    await Services.findByIdAndUpdate('user',userId, updateQuery);
    await Services.findByIdAndUpdate('chat',chatId, {
      $set: { pinned: data.pin },
    });
  } else {
    updateQuery["$set"]["chats.$[chat].pinned"] = data.pin;
    await Services.findByIdAndUpdate('folder',data.folderId, updateQuery, {
      arrayFilters: [{ "chat.chatInfo": chatId }],
    });
  }
  await RH.SendResponse({
    res,
    statusCode: StatusCodes.OK,
    title: "ok",
  });
};

const DeleteChat = async (deleteInfo) => {
  const {
    chatId ,
    userId ,
    deleteAll
  } = deleteInfo;
  const chat = await Services.findOne('chat',{ _id: chatId });
  const user = await Services.findOne('user',{ _id: userId });
  if (deleteAll) {
    if (chat.chatType == "group") {
      if (!chat.owner.equals(userId)) {
        return res.send("no access")
      }
    }
    await Services.deleteOne('chat',{ _id: chatId });
    await Services.updateMany('folder',
      {
        "chats.chatInfo": chatId,
      },
      {
        $pull: { chats: { chatInfo: chatId }, pinnedChats: chatId },
      }
    );
    // pinned chats
    const memberIds = chat.members.map((member) => member.memberId);
    await Services.updateMany('user',
      {
        _id: { $in: memberIds },
      },
      {
        $pull: { pinnedChats: chatId , chats:{chatInfo:chatId} },
      }
    );
  } else {
    if(chat.chatType == "group"){
      await Services.findByIdAndUpdate('chat',chatId, {
        $pull: { members: { memberId: userId } },
      });
    }
    
    await Services.updateMany('folder',
      {
        _id: { $in: user.folders },
      },
      {
        $pull: { chats: { chatInfo: chatId }, pinnedChats: chatId },
      }
    );

    await Services.findByIdAndUpdate('user',userId, {
      $pull: { chats:{chatInfo:chatId} ,pinnedChats: chatId },
    });
  }

  res.send("ok");
};
const deleteChat = async (req, res) => {
  const {
    params: { id: chatId },
    user: { userId },
    body: { deleteAll },
  } = req;
  const chat = await Services.findOne('chat',{ _id: chatId });
  const user = await Services.findOne('user',{ _id: userId });
  if (deleteAll) {
    if (chat.chatType == "group") {
      if (!chat.owner.equals(userId)) {
        return res.send("no access")
      }
    }
    await Services.deleteOne('chat',{ _id: chatId });
    await Services.updateMany('folder',
      {
        "chats.chatInfo": chatId,
      },
      {
        $pull: { chats: { chatInfo: chatId }, pinnedChats: chatId },
      }
    );
    // pinned chats
    const memberIds = chat.members.map((member) => member.memberId);
    await Services.updateMany('user',
      {
        _id: { $in: memberIds },
      },
      {
        $pull: { pinnedChats: chatId , chats:{chatInfo:chatId} },
      }
    );
  } else {
    if(chat.chatType == "group"){
      await Services.findByIdAndUpdate('chat',chatId, {
        $pull: { members: { memberId: userId } },
      });
    }
    
    await Services.updateMany('folder',
      {
        _id: { $in: user.folders },
      },
      {
        $pull: { chats: { chatInfo: chatId }, pinnedChats: chatId },
      }
    );

    await Services.findByIdAndUpdate('user',userId, {
      $pull: { chats:{chatInfo:chatId} ,pinnedChats: chatId },
    });
  }

  res.send("ok");
};

export {addToChats,DeleteChat,deleteChat, pinUnpinChat, createChat, getChat, getChats };
