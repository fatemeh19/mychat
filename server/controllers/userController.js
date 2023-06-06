const User = require("../models/User");
const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");
const path = require('path')


const setInfo = async (req, res) => {
  console.log(req.file);
  const {
    file: { path: url },
    user: { userId },
    body: { name },
  } = req;
  const update = { name: name,'profilePic.url':url};
  const user = await User.findByIdAndUpdate(userId, update);
  if (!user) {
    throw new CustomError.NotFoundError("No user found");
  }

  res.status(StatusCodes.OK).json();
};

module.exports = { setInfo };
