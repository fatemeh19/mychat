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
import { getSetting, editSetting } from "../controllers/settingController.js";
import messages from "../messages/messages.js";

const editSettingI = async (req, res, next) => {
  const {
    body,
    params: { id: settingId },
    files,
  } = req;
  const setting = await editSetting(body, settingId, files);

  res.locals.response = {
    statusCode: StatusCodes.OK,
    value: { setting },
    responseType: messages.ok,
  };
  next();
};

const getSettingI = async (req, res, next) => {
  const {
    params: { id: settingId },
  } = req;
  const setting = await getSetting(settingId);

  res.locals.response = {
    statusCode: StatusCodes.OK,
    value: {
      setting,
    },
    responseType: messages.ok,
  };
  next();
};

export { editSettingI, getSettingI };
