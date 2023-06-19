import * as CustomError  from "../errors/index.js";
import {StatusCodes} from "http-status-codes"
import * as Services from "../services/index.js"
import ErrorMessages from "../messages/errors.js" 
import Fields from "../messages/fields.js"
import path from "path"
import * as RH from"../middlewares/ResponseHandler.js"


const setInfo = async (req, res) => {
  console.log(req.body);
  const {
    user: { userId },
    body: { name, phoneNumber },
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
  let url = "";
  if (req.file) {
    url = path.join(process.cwd(), "../", req.file.path);
  }

  const update = {
    name: name,
    phoneNumber: phoneNumber,
    profilePic: url,
  };
  const user = await Services.User.findAndUpdateUser(userId, update);

  if (!user) {
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


export {
 setInfo };
