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
import { object } from "yup";
import { objectId } from "../utils/typeConverter.js";
import fileCreator from "../utils/fileCreator.js";
import { updateProfilePic } from "./profilePicController.js";
const setInfo = async (req, res) => {
  const {
    user: { userId },
    body,
    file,
  } = req;
  let data
  try {
    data =await Validators.setInfo.validate(body, {
      abortEarly: false,
      stripUnknown: true,
    });
  } catch (err) {
    console.log(err);
    await RH.CustomError({ err, errorClass: CustomError.ValidationError });
  }
  const user = await Services.findOne("user", { phoneNumber: data.phoneNumber });
  const thisUser = await Services.findOne("user", { _id: userId })
  // if (user && user._id != userId) {
  //   await RH.CustomError({
  //     errorClass: CustomError.BadRequestError,
  //     errorType: ErrorMessages.DuplicateError,
  //     Field: Fields.phoneNumber,
  //   });
  // }
  if (file){
    updateProfilePic(thisUser.profilePic,file)
  }

  const updatedUser = await Services.findByIdAndUpdate("user", userId, data);

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

  const user = await Services.aggregate("user", [
    { $match: { _id: await objectId(userId) } },
    {
      $lookup: {
        from: "files",
        localField: "profilePic",
        foreignField: "_id",
        as: "profilePic",
      },
    },
    { $unwind: "$profilePic" },
    {
      $project: {
        name: 1,
        lastname: 1,
        phoneNumber: 1,
        username: 1,
        email: 1,
        profilePic: 1,
        bio:1
      },
    },
  ]);
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
      profile: user[0],
    },
  });
};

const editProfile = async (req, res) => {
  const {
    user: { userId },
    body,
  } = req;

  let data;
  try {
    data = await Validators.editProfile.validate(body, {
      stripUnknown: false,
    });
  } catch (err) {
    await RH.CustomError({ err, errorClass: CustomError.ValidationError });
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

const blockUnblock = async (req, res) => {
  const {
    body: { block, id },
    user: { userId },
  } = req;
  let updateOP;
  if (block) {
    updateOP = "$push";
  } else {
    updateOP = "$pull";
  }

  const result = await Services.aggregate("user", [
    {
      $match: { _id: await objectId(userId) },
    },
    {
      $lookup: {
        from: "settings",
        localField: "settingId",
        foreignField: "_id",
        as: "settingInfo",
      },
    },
    {
      $project: {
        "settingInfo._id": 1,
        "settingInfo.privacyAndSecurity.security.blockedUsers": 1,
      },
    },
  ]);
  console.log(result[0].settingInfo[0]._id);
  const updated = await Services.findByIdAndUpdate(
    "setting",
    { _id: result[0].settingInfo[0]._id },
    {
      [updateOP]: { "privacyAndSecurity.security.blockedUsers": id },
    },
    {
      new: true,
    }
  );
  RH.SendResponse({ res, statusCode: StatusCodes.OK, title: "ok" });
};
export { blockUnblock, setInfo, getProfile, editProfile, setStatus, getUser };
