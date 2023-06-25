import Chat from "../models/Chat.js";
import Fields from "../messages/fields.js";
import * as RH from "../middlewares/ResponseHandler.js";
import mongooseErrorExtractor from "../utils/mongooseErrorExtractor.js";
import * as CustomError from "../errors/index.js";
const createChat = async (memberIds) => {
  const chat = await Chat.create({ memberIds });
  return chat;
};
const findAndUpdateChat = async (id, updateQuery) => {
  try {
    const chat = await Chat.findByIdAndUpdate(id, updateQuery);
    return chat;
  } catch (err) {
    const { errorType, field } = await mongooseErrorExtractor(err);
    return await RH.CustomError({
      errorClass: CustomError.BadRequestError,
      errorType,
      Field: Fields[field],
    });
  }
};
const getChat = async (Query) => {
  try {
    const chat = await Chat.findOne(Query);
    return chat;
  } catch (err) {
    const { errorType, field } = await mongooseErrorExtractor(err);

    return await RH.CustomError({
      errorClass: CustomError.BadRequestError,
      errorType,
      Field: Fields[field],
    });
  }
};

export { getChat, createChat, findAndUpdateChat };
