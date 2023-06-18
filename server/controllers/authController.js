const User = require("../models/User");
const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");
const Utils = require("../utils");
const crypto = require("crypto");
const ErrorMessages = require("../messages/errors.json");
const Fields = require("../messages/fields.json");

const services = require("../services");

const validators = require("../validators");
const {
  RHCustomError,
  RHSendResponse,
} = require("../middlewares/ResponseHandler");

const register = async (req, res) => {
  console.log(req.body);
  let data;
  try {
    data = await validators.registerUser.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });
  } catch (err) {
    
    await RHCustomError({ err, errorClass: CustomError.ValidationError });
  }
  const emailAlreadyExists = await services.User.findUser({
    email: data.email,
  });
  if (emailAlreadyExists) {
    await RHCustomError({
      errorClass: CustomError.BadRequestError,
      errorType: ErrorMessages.DuplicateError,
      Field: Fields.email,
    });
  }

  const verificationToken = crypto.randomBytes(40).toString("hex");
  data.verificationToken = verificationToken;
  let user;

  try {
    user = await services.User.createUser(data);
    await Utils.sendVerificationEmail(data.email, verificationToken);
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
  const user = await services.User.findUser({ email: email });
  if (!user) {
    await RHCustomError({
      errorClass: CustomError.UnauthenticatedError,
      errorType: ErrorMessages.NotFoundError,
      Field: Fields.email,
    });
  }
  if (user.verificationToken != verificationToken) {
    await RHCustomError({
      errorClass: CustomError.UnauthenticatedError,
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
  try {
    data = await validators.loginUser.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });
  } catch (err) {
    await RHCustomError({ err, errorClass: CustomError.ValidationError });
  }
  const user = await services.User.findUser({ email: data.email });
  if (!user) {
    await RHCustomError({
      errorClass: CustomError.UnauthenticatedError,
      errorType: ErrorMessages.NotFoundError,
      Field: Fields.email,
    });
  }

  const isCorrectPassword = await user.comparePassword(data.password);

  if (!isCorrectPassword) {
    await RHCustomError({
      errorClass: CustomError.UnauthenticatedError,
      errorType: ErrorMessages.CompareError,
      Field: Fields.password,
    });
  }
  if (!user.isVerified) {
    await RHCustomError({
      errorClass: CustomError.UnauthenticatedError,
      errorType: ErrorMessages.ConfirmError,
      
    });
  }
  const token = Utils.jwt.createJWT({ userId: user._id });
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
    },
  });
};
module.exports = {
  register,
  verifyEmail,
  login,
};
