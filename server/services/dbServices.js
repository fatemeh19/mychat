import modelSelector from "./modelSelector.js";

import Fields from "../messages/fields.js";
import * as RH from "../middlewares/ResponseHandler.js";
import mongooseErrorExtractor from "../utils/mongooseErrorExtractor.js";
import * as CustomError from "../errors/index.js";
import { deleteFileMessages } from "./ExtraServices.js";
import Chat from "../models/Chat.js";
const create = async (model, data) => {
  const Model = await modelSelector(model);
  const newDocument = await Model.create(data);
  return newDocument;
  
};
const findOne = async (model, Query, select = {}) => {
  const Model = await modelSelector(model);

  let document;
  try {
    document = await Model.findOne(Query).select(select);
  } catch (err) {
    const { errorType, field } = await mongooseErrorExtractor(err);
    await RH.CustomError({
      errorClass: CustomError.BadRequestError,
      errorType,
      Field: Fields[field],
    });
  }

  return document;
};

const findByIdAndUpdate = async (model, id, Query, options={}) => {
    let Model
    if(model == 'chat'){
        
        const chatType = await Chat.findById(id, { chatType: 1 });
        
        Model = await modelSelector(chatType.chatType);

    }else{
        Model = await modelSelector(model);

    }
  
  let document;
  
  try {
    document = await Model.findOneAndUpdate({_id:id}, Query, options).select({
      password: 0,
    });
  } catch (err) {
    
    const { errorType, field } = await mongooseErrorExtractor(err);

    return await RH.CustomError({
      errorClass: CustomError.BadRequestError,
      errorType,
      Field: Fields[field],
    });
  }
 
  return document;
};

const findMany = async (model, Query, select = {}, sort = {}) => {
  const Model = await modelSelector(model);

  const documents = await Model.find(Query).select(select).sort(sort);
  return documents;
};

const findAndUpdateBySave = async (model, Query, data) => {
  const Model = await modelSelector(model);

  let document;
  try {
    document = await Model.findOne(Query);
    document.set(data);
    document = await document.save();
  } catch (err) {
    const { errorType, field } = await mongooseErrorExtractor(err);

    return await RH.CustomError({
      errorClass: CustomError.BadRequestError,
      errorType,
      Field: Fields[field],
    });
  }
  return document;
};
const aggregate = async (model, pipeLine) => {
  const Model = await modelSelector(model);

  const result = await Model.aggregate(pipeLine);
  return result;
};

const updateMany = async (model, Query, update) => {
  const Model = await modelSelector(model);

  const result = await Model.updateMany(Query, update);
  return result;
};

const deleteMany = async (model, Query) => {
  const Model = await modelSelector(model);
  const indexs = await Model.deleteMany(Query);
  if (model == "message") {
    deleteFileMessages(Query);
  }

  return indexs;
};

const deleteOne = async (model, Query) => {
  const Model = await modelSelector(model);

  const result = await Model.deleteOne(Query);
  return result;
};

export {
  create,
  findOne,
  findByIdAndUpdate,
  findMany,
  findAndUpdateBySave,
  aggregate,
  updateMany,
  deleteMany,
  deleteOne
};
