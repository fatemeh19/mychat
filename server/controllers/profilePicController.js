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

const updateProfilePic = async (req, res) => {
  const {
    params: { id },
    file,
  } = req;

  const oldPic = await Services.findByIdAndUpdate("file", id, {
    $set: {
      path: file ? file.path : consts.DEFAULT_PROFILE_PICTURE,
      originalName: file ? file.originalname : "default-profile",
    },
  });
  await fileController.deleteFile(oldPic?.path);

  RH.SendResponse({ res, statusCode: StatusCodes.OK, title: "ok" });
};

export { updateProfilePic };
