import Message from "../models/message.js";
import Fields from "../messages/fields.js";
import * as RH from "../middlewares/ResponseHandler.js";
import mongooseErrorExtractor from "../utils/mongooseErrorExtractor.js";
import * as CustomError from "../errors/index.js";
import * as fileController from '../utils/file.js'

const createMessage = async (message) => {
  //   try {
  const newMessage = await Message.create(message);
  return newMessage;
  //   } catch (err) {
  // console.log(err.errors)
  // console.log("errName=",err.errors)
  // const { errorType, field } = await mongooseErrorExtractor(err);
  // return await RH.CustomError({
  //     errorClass: CustomError.BadRequestError,
  //     errorType,
  //     Field: Fields[field],

  //   });
  //   }
};
const findMessage = async (query) => {
  const message = await Message.findOne(query);
  return message;
};
const deleteMessage = async (Query) => {
  const messages = await getMessages(Query)
  
  const indexs = await Message.deleteMany(Query);
  messages.forEach(message => {
    if(message.content.contentType!='text'){
         fileController.deleteFile(message.content.url)
    }
    
  });
  return indexs;
};
const updateMessages = async (filterQuery, updateQuery) => {
  const updatedMessages = await Message.updateMany(filterQuery, updateQuery);
  return updatedMessages;
};
const getMessages = async (filterQuery = {}) => {
  const messages = await Message.find(filterQuery);
  return messages;
};
export {
  createMessage,
  findMessage,
  deleteMessage,
  updateMessages,
  getMessages,
};
