import * as CustomError  from "../errors/index.js";
import {StatusCodes} from "http-status-codes"
import * as Services from "../services/index.js"
import ErrorMessages from "../messages/errors.js" 
import Fields from "../messages/fields.js"
import path from "path"
import * as RH from"../middlewares/ResponseHandler.js"
import User from "../models/User.js"
import fields from "../messages/fields.js";
import * as consts from '../utils/consts.js'
const setInfo = async (req, res) => {
  console.log(req.body);
  const {
    user: { userId },
    body: { name, phoneNumber,lastname },
  } = req;
  // try {
  //   data =  setInfo.validate(req.body, {
  //     abortEarly: false,
  //     stripUnknown: true,
  //   });
  // } catch (err) {
  //    console.log("err")
  //   // await RH.CustomError({ err, errorClass: ValidationError });
  // }
  const user = await Services.User.findUser({phoneNumber:phoneNumber});
  if(user && user._id!=userId){
    await RH.CustomError({
      errorClass: CustomError.BadRequestError,
      errorType: ErrorMessages.DuplicateError,
      Field: Fields.phoneNumber,
    });
  }

  let url = consts.DEFAULT_PROFILE_PICTURE
  
  if (req.file) {
    url = path.join(process.cwd(), "../", req.file.path);
  }

  const update = {
    name: name,
    phoneNumber: phoneNumber,
    lastname:lastname,
    profilePic: url,
  };
  const updatedUser = await Services.User.findAndUpdateUser(userId, update);

  if (!updatedUser) {
    await RH.CustomError({
      errorClass: CustomError.NotFoundError,
      errorType: ErrorMessages.NotFoundError,
      Field: Fields.user,
    });
  }

  await RH.SendResponse({
    res,
    statusCode: StatusCodes.OK,
    title: "ok",
  });
};

const getProfile = async (req, res)=>{
  console.log("resid")
  const {user:{userId}} = req

  const user = await Services.User.findUser({_id:userId},"name lastname phoneNumber username profilePic")
  if(!user){
    await RH.CustomError({
      errorClass:CustomError.BadRequestError,
      errorType:ErrorMessages.NotFoundError,
      Field:fields.user
    })
  }
  await RH.SendResponse({
    res,
    statusCode:StatusCodes.OK,
    title:"ok",
    value:{
      profile:user
    }
  })  

}


export {
 setInfo,
 getProfile

};
