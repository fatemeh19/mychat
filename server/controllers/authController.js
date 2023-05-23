const User = require("../models/User");
const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");
const {
  sendVerificationEmail,
  sendVerificationCode,
} = require("../utils/sendVerification");
const crypto = require("crypto");
const register = async (req, res) => {
  const { email, password } = req.body;
  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError("email already exists");
  }
  const verificationToken = crypto.randomBytes(40).toString("hex");
  await sendVerificationEmail(email, verificationToken);

  await User.create({
    email,
    password,
    verificationToken,
  });

  res
    .status(StatusCodes.OK)
    .json({
      msg: "success! please check your email and confirm it to active your account",
    });
};

const verifyEmail = async (req, res) => {
  const { email, verificationToken } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError.UnauthenticatedError("Verification Failed");
  }
  if(user.verificationToken!=verificationToken){
    throw new CustomError.UnauthenticatedError("Verification Failed");
  }
  (user.isVerified = true),(user.verified = Date.now())
  user.verificationToken = ''
  user.save()
  res.status(StatusCodes.OK).json({msg:'success! your Email verified'})
};

module.exports = {
  register,
  verifyEmail,
};
