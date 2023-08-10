import * as CustomError from "../errors/index.js";
import { StatusCodes } from "http-status-codes";
import * as Services from "../services/index.js";
import ErrorMessages from "../messages/errors.js";
import Fields from "../messages/fields.js";
import path from "path";
import * as RH from "../middlewares/ResponseHandler.js";
import User from "../models/User.js";
import fields from "../messages/fields.js";
import * as consts from "../utils/consts.js";
import * as Validators from "../validators/settingValidators/index.js";
import * as fileController from "../utils/file.js";

const editSetting = async (req, res) => {
  const {
    body,
    user: { userId },
  } = req;
  let data
  try {
    // data = await 

  } catch (error) {
    
  }


};
