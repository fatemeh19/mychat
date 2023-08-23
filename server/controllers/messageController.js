import * as Validators from "../validators/index.js";
import * as Services from "../services/dbServices.js";
import * as RH from "../middlewares/ResponseHandler.js";
import * as CustomError from "../errors/index.js";
import ErrorMessages from "../messages/errors.js";
import messages from "../messages/messages.js";
import fields from "../messages/fields.js";
import { StatusCodes } from "http-status-codes";
import * as fileController from "../utils/file.js";
import ValidationError from "../errors/ValidationError.js";

import { objectId } from "../utils/typeConverter.js";
import fileCreator from "../utils/fileCreator.js";
const createMessage = async (chatId,message,userId,file) => {
  
 
  const createdFileMessage = file?await fileCreator(file):undefined
  let newMessage = {
    reply: {
      isReplied: Boolean(message?.reply?.isReplied),
      messageId: message?.reply?.messageId,
    },
    content: {
      text: message.content?.text,
      file:file?createdFileMessage._id:undefined
     
    },
    senderId: userId,
  };

  let data;
  try {
    data = await Validators.createMessage.validate(newMessage, {
      // stripUnknown: true,
      abortEarly: false,
    });
  } catch (errors) {
   throw new ValidationError(errors);
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
      throw new CustomError.BadRequestError(
        ErrorMessages.NotFoundError,
        fields.message,
      );
      
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
  
  let msg = chat.messages.pop();
  msg.messageInfo = Message;
  if(file){
    msg.messageInfo.content.file = createdFileMessage

  }

  return msg
};
const DeleteMessage = async (userId, deleteInfo) => {
  let { chatId, messageIds, deleteAll } = deleteInfo;

  messageIds = await objectId(messageIds);
  let notForwardedMessages = await Services.aggregate("chat", [
    { $match: { _id: await objectId(chatId) } },
    {
      $project: {
        // messages: 1,
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
                  $in: ["$$message.messageInfo", messageIds],
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
      (message) => message.messageInfo
    );
  }

  let result;
  if (deleteAll) {
    notForwardedMessages = await objectId(notForwardedMessages)
    const messages = await Services.aggregate("message",[
      {
        $match:{_id:{$in:notForwardedMessages}}
      },
      {
        $lookup:{
          from:"files",
          localField:"content.file",
          foreignField:"_id",
          as:"content.file"
        }
      },
      {$unwind:"$content.file"}
    ])
    
  
    // const messages = await Services.findMany("message", {
    //   _id: { $in: notForwardedMessages },
    // });

    messages.forEach((message) => {
      if (message.content.file) {
        fileController.deleteFile(message.content.file.path);
      }
    });
    let fileIds = messages.map((message)=>message.content.file._id)
    
      Services.deleteMany("file", {
      _id: { $in: fileIds },
    });

    Services.deleteMany("message", {
      _id: { $in: notForwardedMessages },
    });

    Services.findByIdAndUpdate("chat", chatId, {
      $pull: { messages: { messageInfo: { $in: messageIds } } },
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
            "message.messageInfo": {
              $in: messageIds,
            },
          },
        ],
      }
    );
  }

 
};
const forwardMessage = async (chatId,messageIds,userId) => {
  

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
  return forwardInfo
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
const editMessage = async (body,file,messageId) => {
  
  let data;
  try {
    data = await Validators.editMessage.validate(body, {
      stripUnknown: true,
      abortEarly: false,
    });
  } catch (errors) {
    throw new ValidationError(errors);
    }
  // if message exists
  const message = await Services.findOne("message", { _id: messageId });

  if (
    (message.content.contentType == "text" && file) 
  ) {
    // error
    throw new CustomError.BadRequestError(
      ErrorMessages.ContentMatchError,
      fields.file,
    );
    
  }
  // if (!message.content.text) {
  //   if (!file) {
  //     throw new CustomError.BadRequestError(
  //       ErrorMessages.NoFileFoundError,
  //       fields.file,
  //     );
  //     // error
  //   }
  // }
  if (file) {
    
    fileController.deleteFile(message.content.file.path);
    let updatedFileMessage = await Services.findByIdAndUpdate("file",message.content.file._id,{
      originalName:file.originalname,
      path:file.path,
      contentType:file.fileType
    },{
      new:true
    })
    
    data.content.file = updatedFileMessage
  }else{
    
    data.content.file = await Services.findOne("file",{_id:message.content.file})

  }

  message.content = data.content;
  message.edited = true;
  const editedMessage = await message.save();
  return editedMessage
};

const searchMessage = async (chatId,search) => {
  const chat = await Services.findOne("chat", { _id: chatId }, { messages: 1 });
  let messageIds = chat.messages.map((message) => message.messageInfo);
  messageIds = await objectId(messageIds);
  let searchRegex = new RegExp(`${search}`, "i");

  const conditions = messageIds.map(function (value, index) {
    return {
      $cond: {
        if: {
          $and: [
            { $regexFind: { input: "$content.text", regex: searchRegex } },
            { $eq: ["$_id", value] },
          ],
        },
        then: index,
        else: -1,
      },
    };
  });
  const messages = await Services.aggregate("message", [
    {
      $match: {
        _id: { $in: messageIds },
        "content.text": { $regex: search, $options: "i" },
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
        indexes: conditions,
        "content.file":1,
        "content.text": 1,
        "senderInfo.name": 1,
        "senderInfo.lastname": 1,
        "senderInfo.profilePic": 1,
        createdAt: 1,
      },
    },

    {
      $project: {
        _id: 1,
        "content.file":1,
        "content.text": 1,
        "senderInfo.name": 1,
        "senderInfo.lastname": 1,
        "senderInfo.profilePic": 1,
        createdAt: 1,
        index: {
          $filter: {
            input: "$indexes",
            as: "indexes",
            cond: { $ne: ["$$indexes", -1] },
          },
        },
      },
    },
    { $unwind: "$index" },
    {
      $sort: {
        createdAt: -1,
      },
    },
  ]);

  return messages
  
};
export {
  editMessage,
  pinUnPinMessage,
  forwardMessage,
  createMessage,
  DeleteMessage,
  searchMessage,
};
