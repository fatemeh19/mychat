 import {NotFoundError,UnauthorizedError,UnauthenticatedError,ValidationError,BadRequestError}  from "../errors/index.js";
import {StatusCodes} from "http-status-codes"
import {findUsers,
  findUser,
  createUser,
  findAndUpdateUser,} from "../services/User.js"
import ErrorMessages from "../messages/errors.js" 
import Fields from "../messages/fields.js"
import path from "path"
import {
  RHCustomError,
  RHSendResponse,
} 
from"../middlewares/ResponseHandler.js"


const setInfo = async (req, res) => {
  console.log(req.body);
  const {
    user: { userId },
    body: { name, phoneNumber },
  } = req;
  // try {
  //   data =  setInfoV.validate(req.body, {
  //     abortEarly: false,
  //     stripUnknown: true,
  //   });
  // } catch (err) {
  //    console.log("err")
  //   // await RHCustomError({ err, errorClass: ValidationError });
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
  const user = await findAndUpdateUser(userId, update);

  if (!user) {
    await RHCustomError({
      errorClass:   NotFoundError,
      errorType: ErrorMessages.NotFoundError,
      Field: Fields.user,
    });
  }

  await RHSendResponse({
    res,
    statusCode: StatusCodes.OK,
    title: "ok",
  });
};


export {
 setInfo };
