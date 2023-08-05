import Folder from "../models/folder.js";
import Fields from "../messages/fields.js";
import * as RH from "../middlewares/ResponseHandler.js";
import mongooseErrorExtractor from "../utils/mongooseErrorExtractor.js";
import * as CustomError from "../errors/index.js";
const findFolder = async (filter, select = "") => {
  let folder;
  try {
    folder = await Folder.findOne(filter).select(select);
  } catch (err) {
    const { errorType, field } = await mongooseErrorExtractor(err);
    console.log(field);
    await RH.CustomError({
      errorClass: CustomError.BadRequestError,
      errorType,
      Field: Fields[field],
    });
  }

  return folder;
};

const createFolder = async (body) => {
  const folder = await Folder.create(body);
  return folder;
};

const findAndUpdateFolder = async (id, updateQuery,options) => {
  let folder;

  try {
    folder = await Folder.findByIdAndUpdate(id, updateQuery, options).select({password:0});
  } catch (err) {
    console.log(err)
    const { errorType, field } = await mongooseErrorExtractor(err);

    return await RH.CustomError({
      errorClass: CustomError.BadRequestError,
      errorType,
      Field: Fields[field],
    });
  }

  return folder;
};

const findFolders = async (Query, select = "", sort = "") => {
  const folders = await Folder.find(Query).select(select).sort(sort);
  return folders;
};

const findAndUpdateBySave = async (findQuery, data) => {
  let folder;
  try {
    folder = await Folder.findOne(findQuery);
    folder.set(data);
    folder = await folder.save();
  } catch (err) {
    const { errorType, field } = await mongooseErrorExtractor(err);

    return await RH.CustomError({
      errorClass: CustomError.BadRequestError,
      errorType,
      Field: Fields[field],
      
    });
  }
  return folder
};

const aggregateFolders = async (pipeLine)=>{
  const result = await Folder.aggregate(pipeLine)
  return result

}
const deleteFolder = async (Query)=>{
    const result = await Folder.deleteOne(Query)
    return result
}

export {
    aggregateFolders,
    findAndUpdateBySave,
    findFolders,
    findAndUpdateFolder,
    createFolder,
    findFolder,
    deleteFolder

}
