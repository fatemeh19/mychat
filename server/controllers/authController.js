import User from "../models/User.js"
import * as CustomError  from "../errors/index.js";
import {StatusCodes} from "http-status-codes"
import * as Util from "../utils/index.js"
import crypto from "crypto"
import ErrorMessages from "../messages/errors.js"
import Fields from "../messages/fields.js" 
import * as Services from "../services/index.js"
import * as Validators from "../validators/index.js"
import * as RH from"../middlewares/ResponseHandler.js"



const register = async (req, res) => {
  console.log(req.body);
  let data;
  try {
    data = await  Validators.registerUser.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });
  } catch (err) {
    
    await RH.CustomError({ err, errorClass: CustomError.ValidationError });
  }
  const emailAlreadyExists = await Services.User.findUser({
    email: data.email,
  });
  if (emailAlreadyExists) {
    await RH.CustomError({
      errorClass: CustomError.BadRequestError,
      errorType: ErrorMessages.DuplicateError,
      Field: Fields.email,
    });
  }

  const verificationToken = crypto.randomBytes(40).toString("hex");
  data.verificationToken = verificationToken;
  let user;

  try {
    user = await Services.User.createUser(data);
    await  Util.sendVerificationEmail(data.email, verificationToken);
  } catch (error) {
    if (user) {
      await User.findByIdAndDelete(user._id);
      throw new Error(error.message);
    }
  }

  return RH.SendResponse({ res, statusCode: StatusCodes.OK, title: "confirm" });
};

const verifyEmail = async (req, res) => {
  const { email, verificationToken } = req.body;
  const user = await Services.User.findUser({ email: email });
  if (!user) {
    await RH.CustomError({
      errorClass: CustomError.UnauthenticatedError,
      errorType: ErrorMessages.NotFoundError,
      Field: Fields.email,
    });
  }
  if (user.verificationToken != verificationToken) {
    await RH.CustomError({
      errorClass: CustomError.UnauthenticatedError,
      errorType: ErrorMessages.CompareError,
      Field: Fields.verificationToken,
    });
  }

  (user.isVerified = true), (user.verified = Date.now());
  user.verificationToken = "";
  await user.save();
  return RH.SendResponse({
    res,
    statusCode: StatusCodes.OK,
    title: "confirmed",
  });
};

const login = async (req, res) => {
  let data
  try {
    data = await  Validators.loginUser.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });
  } catch (err) {
    await RH.CustomError({ err, errorClass: CustomError.ValidationError });
  }
  const user = await Services.User.findUser({ email: data.email });
  if (!user) {
    await RH.CustomError({
      errorClass: CustomError.UnauthenticatedError,
      errorType: ErrorMessages.NotFoundError,
      Field: Fields.email,
    });
  }

  const isCorrectPassword = await user.comparePassword(data.password);

  if (!isCorrectPassword) {
    await RH.CustomError({
      errorClass: CustomError.UnauthenticatedError,
      errorType: ErrorMessages.CompareError,
      Field: Fields.password,
    });
  }
  if (!user.isVerified) {
    await RH.CustomError({
      errorClass: CustomError.UnauthenticatedError,
      errorType: ErrorMessages.ConfirmError,
      
    });
  }
  const token =  Util.createJWT({ userId: user._id });
  let isFirstTimeLogin = user.isFirstTimeLogin;
  if (user.isFirstTimeLogin) {
    user.isFirstTimeLogin = false;
    user.save();
  }

  return RH.SendResponse({
    res,
    statusCode: StatusCodes.OK,
    title: "successLogin",
    value: {
      token,
      isFirstTimeLogin,
      
    },
  });
};
export {
  register,
  verifyEmail,
  login,
};
