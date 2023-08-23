import * as Validators from "../validators/index.js";
import * as Services from "../services/dbServices.js";
import * as RH from "../middlewares/ResponseHandler.js";
import * as CustomError from "../errors/index.js";
import ErrorMessages from "../messages/errors.js";
import messages from "../messages/messages.js";
import fields from "../messages/fields.js";
import { StatusCodes } from "http-status-codes";
import { objectId } from "../utils/typeConverter.js";
import {
  editFolder,
  getFolders,
  getFolder,
  deleteFolder,
  addRemoveChat,
  createFolder,
} from "../controllers/folderController.js";

const createFolderI = async (req, res, next) => {
  const {
    user: { userId },
    body,
  } = req;
  const newFolder = await createFolder(userId, body);

  res.locals.response = {
    statusCode : StatusCodes.OK,
    value: {
      folderId: newFolder._id,
    },
    responseType:messages.ok
  }
  next()
  
};

const addRemoveChatI = async (req, res,next) => {
  // tekrari chat
  let {
    body,
    params: { folderId },
  } = req;
  await addRemoveChat(body, folderId);

  res.locals.response = {
    statusCode : StatusCodes.OK,
    responseType:messages.ok
  }
  next()
};

const deleteFolderI = async (req, res, next) => {
  const {
    params: { id: folderId },
    user: { userId },
  } = req;
  await deleteFolder(userId, folderId);

  res.locals.response = {
    statusCode : StatusCodes.OK,
    responseType:messages.ok
  }
  next()
};

const getFolderI = async (req, res, next) => {
  const {
    params: { id: folderId },
  } = req;

  const folder = await getFolder(folderId);

  res.locals.response = {
    statusCode : StatusCodes.OK,
    value:{
      folder
    },
    responseType:messages.ok
  }
  next()
};

const getFoldersI = async (req, res, next) => {
  const {
    user: { userId },
  } = req;

  const folders = await getFolders(userId);

  res.locals.response = {
    statusCode : StatusCodes.OK,
    value: {
      folders
    },
    responseType:messages.ok
  }
  
  next()
};

const editFolderI = async (req, res, next) => {
  const {
    params: { id: folderId },
    body,
  } = req;

  const Folder = await editFolder(body, folderId);

  res.locals.response = {
    statusCode : StatusCodes.OK,
    value: {
      Folder
    },
    responseType:messages.ok
  }
  next()
  
};

export {
  editFolderI,
  deleteFolderI,
  addRemoveChatI,
  createFolderI,
  getFolderI,
  getFoldersI,
};
