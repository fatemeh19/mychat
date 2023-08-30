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
import ValidationError from "../errors/ValidationError.js";

const setInfo = async (userId, body, file) => {
  let data;
  try {
    data = await Validators.setInfo.validate(body, {
      abortEarly: false,
      stripUnknown: true,
    });
  } catch (errors) {
    throw new ValidationError(errors);
  }
  const thisUser = await Services.findOne("user", { _id: userId });

  if (file) {
    updateProfilePic(thisUser.profilePic, file);
  }
  console.log("set = ",data)

  await Services.findByIdAndUpdate("user", userId, data);
};

const getProfile = async (userId) => {
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
        bio: 1,
      },
    },
  ]);

  return user[0];
};

const editProfile = async (userId, body) => {
  let data;
  try {
    data = await Validators.editProfile.validate(body, {
      stripUnknown: false,
      abortEarly:true
    });
  } catch (errors) {
    throw new ValidationError(errors);
  }

  await Services.findByIdAndUpdate("user", userId, data);
};

const setStatus = async ({ userId, online }) => {
  Services.findByIdAndUpdate("user", userId, {
    status: {
      online,
      lastseen: Date.now(),
    },
  });
};

const blockUnblock = async (body, userId) => {
  const { block, id } = body;

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
  await Services.findByIdAndUpdate(
    "setting",
    { _id: result[0].settingInfo[0]._id },
    {
      [updateOP]: { "privacyAndSecurity.security.blockedUsers": id },
    },
    {
      new: true,
    }
  );
};

const searchUsername = async (search)=>{

}
export { blockUnblock, setInfo, getProfile, editProfile, setStatus };
