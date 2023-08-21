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
import { getSetting,editSetting } from "../controllers/settingController.js";
const editSettingI = async (req, res) => {
  const {
    body,
    params: { id: settingId, title },
    files,
  } = req;
  await editSetting(body,settingId,title,files)


  return RH.SendResponse({ res, statusCode: StatusCodes.OK, title: "ok" });
};

const getSettingI = async (req, res) => {
  const {
    params: { id: settingId },
  } = req;
  const setting = await getSetting(settingId)
 
  RH.SendResponse({
    res,
    statusCode: StatusCodes.OK,
    title: "ok",
    value: {
      setting,
    },
  });
};

export { editSettingI, getSettingI };
