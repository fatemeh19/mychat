import * as CustomError from "../errors/index.js";
import { StatusCodes } from "http-status-codes";
import * as Services from "../services/dbServices.js";
import ErrorMessages from "../messages/errors.js";
import Fields from "../messages/fields.js";
import path from "path";
import * as RH from "../middlewares/ResponseHandler.js";
import User from "../models/User.js";
import fields from "../messages/fields.js";
import * as consts from "../utils/consts.js";
import * as Validators from "../validators/index.js";
import * as fileController from "../utils/file.js";
import { object } from "yup";
import { objectId } from "../utils/typeConverter.js";
import fileCreator from "../utils/fileCreator.js";
import ValidationError from "../errors/ValidationError.js";

const updateProfilePic = async (id, file) => {

  const profilePic = await Services.findOne("file",{_id:id})
  await fileController.deleteFile(profilePic?.path);
  profilePic.path = file ? file.path : consts.DEFAULT_PROFILE_PICTURE
  profilePic.originalName= file ? file.originalname : "default-profile",
  await profilePic.save()
  // const oldPic = await Services.findByIdAndUpdate("file", id, {
  //   $set: {
  //     path: file ? file.path : consts.DEFAULT_PROFILE_PICTURE,
  //     originalName: file ? file.originalname : "default-profile",
  //   },
    
  // },{
  //   runValidators:true
  // });
  return profilePic

};

export { updateProfilePic };
