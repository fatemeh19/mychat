const User = require("../models/User");
const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");
const Utils = require("../utils");
const crypto = require("crypto");
const ErrorMessages = require("../messages/errors.json");
const ErrorFields = require("../messages/fields.json");

const services = require("../services");

const validators = require("../validators");
const {
  RHCustomError,
  RHValidationError,
  RHSendResponse,
} = require("../middlewares/ResponseHandlerMiddleware");
const { date } = require("yup");

const register = async (req, res) => {
  let data;
  try {
    data = await validators.registerUser.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });
  } catch (error) {
    await RHValidationError(error);
  }
  const emailAlreadyExists = await services.User.findUser({
    email: data.email,
  });
  if (emailAlreadyExists) {
    
    await RHCustomError(
      CustomError.BadRequestError,
      ErrorMessages.DuplicateError,
      ErrorFields.email
    );
  }

  const verificationToken = crypto.randomBytes(40).toString("hex");
  data.verificationToken = verificationToken
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

  return RHSendResponse(res, StatusCodes.OK, "register", "confirm");
};

const verifyEmail = async (req, res) => {
  const { email, verificationToken } = req.body;
  const user = await services.User.findUser({ email: email });
  if (!user) {
    await RHCustomError(
      CustomError.UnauthenticatedError,
      ErrorMessages.NotFoundError,
      ErrorFields.email
    );
  }
  if (user.verificationToken != verificationToken) {
    await RHCustomError(
      CustomError.UnauthenticatedError,
      ErrorMessages.CompareError,
      ErrorFields.verificationToken
    );
  }

  (user.isVerified = true), (user.verified = Date.now());
  user.verificationToken = "";
  await user.save();
  return RHSendResponse(res, StatusCodes.OK, "verifyEmail", "confirmed");
};

const login = async (req, res) => {
  try {
    data = await validators.loginUser.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });
  } catch (error) {
    await RHValidationError(error);
  }
  const user = await services.User.findUser({ email: data.email });
  if (!user) {
    await RHCustomError(
      CustomError.UnauthenticatedError,
      ErrorMessages.NotFoundError,
      ErrorFields.email
    );
  }

  const isCorrectPassword = await user.comparePassword(data.password);

  if (!isCorrectPassword) {
    await RHCustomError(
      CustomError.UnauthenticatedError,
      ErrorMessages.CompareError,
      ErrorFields.password
    );
  }
  if (!user.isVerified) {
    await RHCustomError(
      CustomError.UnauthenticatedError,
      ErrorMessages.ConfirmError,
      ErrorFields.verificationToken
    );
  }
  const token = Utils.jwt.createJWT({ userId: user._id });
  let isFirstTimeLogin = user.isFirstTimeLogin
  if(user.isFirstTimeLogin){
    user.isFirstTimeLogin = false
    user.save()
  }

  return RHSendResponse(res, StatusCodes.OK, "login", "success", { token, isFirstTimeLogin });
};
module.exports = {
  register,
  verifyEmail,
  login,
};
