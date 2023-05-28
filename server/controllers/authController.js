const User = require("../models/User");
const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");
const Utils = require("../utils");
const crypto = require("crypto");
const register = async (req, res) => {
  const { email, password } = req.body;
  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError("email already exists");
  }
  const verificationToken = crypto.randomBytes(40).toString("hex");

  let user;
  // try {

  user = await User.create({
    email,
    password,
    verificationToken,
  });
  await Utils.sendVerificationEmail(email, verificationToken);

  // } catch (error) {
  //   if(user){
  //     await User.findByIdAndDelete(user._id)

  //   }
  // throw new CustomError.BadRequestError(error)

  // }

  res.status(StatusCodes.OK).json({
    msg: "success! please check your email and confirm it to active your account",
  });
};

const verifyEmail = async (req, res) => {
  const { email, verificationToken } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError.UnauthenticatedError("Verification Failed");
  }
  if (user.verificationToken != verificationToken) {
    throw new CustomError.UnauthenticatedError("Verification Failed");
  }
  (user.isVerified = true), (user.verified = Date.now());
  user.verificationToken = "";
  user.save();
  res.status(StatusCodes.OK).json({ msg: "success! your Email verified" });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email ) {
    throw new CustomError.BadRequestError("Please provide email ");
  }
  if (!password) {
    throw new CustomError.BadRequestError("Please provide password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError.UnauthenticatedError("email Not Found");
  }

  const isCorrectPassword = await user.comparePassword(password);
  console.log(isCorrectPassword)
  if(!isCorrectPassword) {
    throw new CustomError.UnauthenticatedError("Wrong Password");
  }
  if (!user.isVerified) {
    throw new CustomError.UnauthenticatedError(
      "Please Verify Your Email First"
    );
  }
  const token = Utils.jwt.createJWT({ userId: user._id, name: user.name });

  res.status(StatusCodes.OK).json({ token });
};
module.exports = {
  register,
  verifyEmail,
  login,
};
