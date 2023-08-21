import * as Validators from "../validators/index.js";
import * as Services from "../services/dbServices.js";
import * as RH from "../middlewares/ResponseHandler.js";
import * as CustomError from "../errors/index.js";
import ErrorMessages from "../messages/errors.js";
import messages from "../messages/messages.js";
import fields from "../messages/fields.js";
import { StatusCodes } from "http-status-codes";
import { objectId } from "../utils/typeConverter.js";
import {editFolder,getFolders,getFolder,deleteFolder,addRemoveChat,createFolder} from '../controllers/folderController.js' 

const createFolderI = async (req, res) => {
  const {
    user: { userId },
    body,
  } = req;
  const newFolder = await createFolder(userId,body)

  RH.SendResponse({
    res,
    statusCode: StatusCodes.OK,
    value: {
      folderId: newFolder._id,
    },
    title: "ok",
  });
};

const addRemoveChatI = async (req, res) => {
  // tekrari chat
  let {
    body,
    params: { folderId },
  } = req;
  await addRemoveChat(body,folderId)

  RH.SendResponse({
    res,
    statusCode: StatusCodes.OK,
    title: "ok",
  });
};

const deleteFolderI = async (req, res) => {
  const {
    params: { id: folderId },
    user: { userId },
  } = req;
  await deleteFolder(userId, folderId)
 
  RH.SendResponse({
    res,
    statusCode: StatusCodes.OK,
    title: "ok",
  });
};

const getFolderI = async (req, res) => {
  const {
    params: { id: folderId },
  } = req;

  const folder = await getFolder(folderId)
  console.log("haay")
  RH.SendResponse({
    res,
    statusCode: StatusCodes.OK,
    title: "ok",
    value: { folder },
  });
};

const getFoldersI = async (req, res) => {
  const {
    user: { userId },
  } = req;

  const folders = await getFolders(userId)
 

  RH.SendResponse({
    res,
    statusCode: StatusCodes.OK,
    title: "ok",
    value: { folders },
  });
};

const editFolderI = async (req, res) => {
  const {
    params: { id: folderId },
    body,
  } = req;

  await editFolder(body,folderId)
 
  RH.SendResponse({ res, statusCode: StatusCodes.OK, title: "ok" });

};

export {
  editFolderI,
  deleteFolderI,
  addRemoveChatI,
  createFolderI,
  getFolderI,
  getFoldersI,
};
