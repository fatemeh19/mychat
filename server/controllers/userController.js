import * as CustomError from "../errors/index.js";
import { StatusCodes } from "http-status-codes";
import * as Services from "../services/dbServices.js";
import ErrorMessages from "../messages/errors.js";
import Fields from "../messages/fields.js";
import path from "path";
import * as RH from "../middlewares/ResponseHandler.js";
import User from "../models/User.js";
import fields from "../messages/fields.js";
import * as consts from "../utils/consts.js";
import * as Validators from "../validators/index.js";
import * as fileController from "../utils/file.js";
const setInfo = async (req, res) => {
  console.log(req.body);
  const {
    user: { userId },
    body: { name, phoneNumber, lastname, username },
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
  const user = await Services.findOne("user", { phoneNumber: phoneNumber });
  if (user && user._id != userId) {
    await RH.CustomError({
      errorClass: CustomError.BadRequestError,
      errorType: ErrorMessages.DuplicateError,
      Field: Fields.phoneNumber,
    });
  }

  let url = consts.DEFAULT_PROFILE_PICTURE;

  if (req.file) {
    url = req.file.path;
  }

  const update = {
    name: name,
    phoneNumber: phoneNumber,
    lastname: lastname,
    profilePic: url,
    username: username ? username : undefined,
  };
  const updatedUser = await Services.findByIdAndUpdate("user", userId, update);

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

const getProfile = async (req, res) => {
  const {
    user: { userId },
  } = req;

  const user = await Services.findOne(
    "user",
    { _id: userId },
    {
      name: 1,
      lastname: 1,
      phoneNumber: 1,
      username: 1,
      email: 1,
      profilePic: 1,
    }
  );
  if (!user) {
    await RH.CustomError({
      errorClass: CustomError.BadRequestError,
      errorType: ErrorMessages.NotFoundError,
      Field: fields.user,
    });
  }
  await RH.SendResponse({
    res,
    statusCode: StatusCodes.OK,
    title: "ok",
    value: {
      profile: user,
    },
  });
};

const editProfile = async (req, res) => {
  const {
    user: { userId },
  } = req;
  console.log(req.body);
  const User = await Services.findOne("user", { _id: userId });

  let data;
  try {
    data = await Validators.editProfile.validate(req.body);
  } catch (err) {
    await RH.CustomError({ err, errorClass: CustomError.ValidationError });
  }
  if (req.file) {
    if (User.profilePic != consts.DEFAULT_PROFILE_PICTURE) {
      await fileController.deleteFile(User.profilePic);
    }
    data.profilePic = req.file.path;
  }
  const user = await Services.findAndUpdateBySave(
    "user",
    { _id: userId },
    data
  );
  if (!user) {
    await RH.CustomError({
      errorClass: CustomError.BadRequestError,
      errorType: ErrorMessages.NotFoundError,
      Field: fields.user,
    });
  }
  await RH.SendResponse({
    res,
    statusCode: StatusCodes.OK,
    title: "ok",
  });
};

const setStatus = async ({ userId, online }) => {
  //  if user does not exist
  // error
  Services.findByIdAndUpdate("user", userId, {
    status: {
      online,
      lastseen: Date.now(),
    },
  });
};

const getUser = async (req, res) => {
  const { id: userId } = req.params;
  const user = await Services.findOne("user", { _id: userId }, { password: 0 });
  // if user does not exists

  RH.SendResponse({
    res,
    statusCode: StatusCodes.OK,
    title: "ok",
    value: {
      user,
    },
  });
};

const blockUser = async (req, res) => {
  const {
    user: { userId },
  } = req;
  const user = await Services.aggregate("user",[{
    match
  }])
};
export { setInfo, getProfile, editProfile, setStatus, getUser };
