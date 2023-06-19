import User from "../models/User.js"
import {NotFoundError,UnauthorizedError,UnauthenticatedError,ValidationError,BadRequestError}  from "../errors/index.js";
import {StatusCodes} from "http-status-codes"
import {createJWT,
  sendEmail,
  sendVerificationEmail,
  sendVerificationCode} from "../utils/index.js"
  // import * as Util from "../utils/index.js"
import crypto from "crypto"
import ErrorMessages from "../messages/errors.js"
import Fields from "../messages/fields.js" 
import {findUsers,
  findUser,
  createUser,
  findAndUpdateUser,} from "../services/User.js"

 import {loginUserV,
    registerUserV,
    setInfoV,
    addContactV} from "../validators/index.js"
import {
  RHCustomError,
  RHSendResponse,
} 
from"../middlewares/ResponseHandler.js"



const register = async (req, res) => {
  console.log(req.body);
  let data;
  try {
    data = await  registerUserV.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });
  } catch (err) {
    
    await RHCustomError({ err, errorClass: ValidationError });
  }
  const emailAlreadyExists = await findUser({
    email: data.email,
  });
  if (emailAlreadyExists) {
    await RHCustomError({
      errorClass: BadRequestError,
      errorType: ErrorMessages.DuplicateError,
      Field: Fields.email,
    });
  }

  const verificationToken = crypto.randomBytes(40).toString("hex");
  data.verificationToken = verificationToken;
  let user;

  try {
    user = await createUser(data);
    await  sendVerificationEmail(data.email, verificationToken);
  } catch (error) {
    if (user) {
      await User.findByIdAndDelete(user._id);
      throw new Error(error.message);
    }
  }

  return RHSendResponse({ res, statusCode: StatusCodes.OK, title: "confirm" });
};

const verifyEmail = async (req, res) => {
  const { email, verificationToken } = req.body;
  const user = await findUser({ email: email });
  if (!user) {
    await RHCustomError({
      errorClass: UnauthenticatedError,
      errorType: ErrorMessages.NotFoundError,
      Field: Fields.email,
    });
  }
  if (user.verificationToken != verificationToken) {
    await RHCustomError({
      errorClass: UnauthenticatedError,
      errorType: ErrorMessages.CompareError,
      Field: Fields.verificationToken,
    });
  }

  (user.isVerified = true), (user.verified = Date.now());
  user.verificationToken = "";
  await user.save();
  return RHSendResponse({
    res,
    statusCode: StatusCodes.OK,
    title: "confirmed",
  });
};

const login = async (req, res) => {
  let data
  try {
    data = await  loginUserV.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });
  } catch (err) {
    await RHCustomError({ err, errorClass: ValidationError });
  }
  const user = await findUser({ email: data.email });
  if (!user) {
    await RHCustomError({
      errorClass: UnauthenticatedError,
      errorType: ErrorMessages.NotFoundError,
      Field: Fields.email,
    });
  }

  const isCorrectPassword = await user.comparePassword(data.password);

  if (!isCorrectPassword) {
    await RHCustomError({
      errorClass: UnauthenticatedError,
      errorType: ErrorMessages.CompareError,
      Field: Fields.password,
    });
  }
  if (!user.isVerified) {
    await RHCustomError({
      errorClass: UnauthenticatedError,
      errorType: ErrorMessages.ConfirmError,
      
    });
  }
  const token =  createJWT({ userId: user._id });
  let isFirstTimeLogin = user.isFirstTimeLogin;
  if (user.isFirstTimeLogin) {
    user.isFirstTimeLogin = false;
    user.save();
  }

  return RHSendResponse({
    res,
    statusCode: StatusCodes.OK,
    title: "successLogin",
    value: {
      token,
      isFirstTimeLogin,
      userId:user._id
    },
  });
};
export {
  register,
  verifyEmail,
  login,
};
