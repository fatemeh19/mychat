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
import validatorSelector from "../validators/settingValidators/index.js";
import * as fileController from "../utils/file.js";
import * as dbServices from "../services/dbServices.js"
const editSetting = async (req, res) => {
  const {
    body,
    user: { userId },
    params:{title},
    notifSound
  } = req;

 
  let data
  try {
    let validator = await validatorSelector(title)
    data = await validator.validate(body,{
        stripUnknown:true,
        abortEarly:false
    })
  } catch (err) {
    return RH.CustomError({err, errorClass:CustomError.ValidationError})
  }

  if(notifSound){
    data.sound = notifSound.path

  }else{

  }



};

export {
    editSetting
}
