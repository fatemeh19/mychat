import * as CustomError from "../errors/index.js";
import { StatusCodes } from "http-status-codes";
import * as Services from "../services/dbServices.js";
import ErrorMessages from "../messages/errors.js";
import Fields from "../messages/fields.js";
import path from "path";
import * as RH from "../middlewares/ResponseHandler.js";
import fields from "../messages/fields.js";
import * as consts from "../utils/consts.js";
import validatorSelector from "../validators/settingValidators/index.js";
import * as fileController from "../utils/file.js";
const editSetting = async (req, res) => {
  const {
    body,
    user: { userId },
    params: { id: settingId, title },
    files,
  } = req;

  const setting = await Services.findOne(
    "setting",
    { _id: settingId },
    { [title]: 1 }
  );

  let data;
  try {
    let validator = await validatorSelector(title);
    data = await validator.validate(body, {
      stripUnknown: true,
      abortEarly: false,
    });
  } catch (err) {
    return RH.CustomError({ err, errorClass: CustomError.ValidationError });
  }

  if (files.notifSound) {
    if (setting[title].sound != consts.DEFAULT_NOTIF_SOUND) {
      await fileController.deleteFile(setting[title].sound);
    }
    data.sound = files.notifSound[0].path;
  } else if (data.notifs) {
    data.sound = consts.DEFAULT_NOTIF_SOUND;
    await fileController.deleteFile(setting[title].sound);
  } else {
    data.sound = undefined;
    await fileController.deleteFile(setting[title].sound);
  }

  if (files.background) {
    if (setting[title].background != consts.DEFAULT_BACKGROUND_PICTURE) {
      await fileController.deleteFile(setting[title].background);
    }
    data.background = files.background[0].path;
  } else {
    data.background = consts.DEFAULT_BACKGROUND_PICTURE;
    await fileController.deleteFile(setting[title].background);
  }

  const updated = await Services.findByIdAndUpdate(
    "setting",
    { _id: settingId },
    {
      $set: { [title]: data },
    },
    {
      new: true,
    }
  );
  return RH.SendResponse({ res, statusCode: StatusCodes.OK, title: "ok" });
};

const getSetting = async (req, res) => {
  const {
    params: { id: settingId },
  } = req;
  // if does not exist
  const setting = await Services.findOne("setting", { _id: settingId });

  RH.SendResponse({
    res,
    statusCode: StatusCodes.OK,
    title: "ok",
    value: {
      setting,
    },
  });
};

export { editSetting, getSetting };
