import { StatusCodes } from "http-status-codes";
import * as CustomError from "../errors/index.js";
import * as RH from "../middlewares/ResponseHandler.js";
import * as Services from "../services/dbServices.js";
import * as Validators from "../validators/index.js";
import * as fileController from "../utils/file.js"
const addMember = async (req, res, next) => {
  // if it has joined by link
  // if new member has privacy limitations send suitable error
  // limitations for number of members
  const {
    body: { memberId },
    params: { chatId: groupId },
  } = req;
  req.user.userId = memberId;
  req.params.id = groupId;
  const updatedChat = await Services.findByIdAndUpdate('chat',groupId, {
    $push: { members: { memberId, joinedAt: Date.now() } },
  });
  res.locals.resData = {
    res:updatedChat.members.pop()
  }
  next();
  // console.log(addToGroupResult);
  // RH.SendResponse({ res, statusCode: StatusCodes.OK, title: "ok" });
};

const editGroupType = async (req, res) => {
  const { chatId: groupId } = req.params;
  let data;
  try {
    data = await Validators.editGroupType.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });
  } catch (err) {
    await RH.CustomError({ err, errorClass: CustomError.ValidationError });
  }

  await Services.findByIdAndUpdate('chat',
    groupId,
    {
      $set: { groupTypeSetting: data },
    },
    {
      new: true,
    }
  );
  RH.SendResponse({ res, statusCode: StatusCodes.OK, title: "ok" });
};

const removeMember = async (req, res, next) => {
  const {
    params: { chatId: groupId, memberId },
  } = req;
  const removeFromGroupResult = await Services.findByIdAndUpdate('chat',groupId, {
    $pull: { members: { memberId: memberId } },
  });
  req.body.deleteAll = false;
  req.params.id = groupId;
  req.user.userId = memberId;
  next();
  // RH.SendResponse({ res, statusCode: StatusCodes.OK, title: "ok" });
};

const editGroupPermissions = async (req, res) => {
  const {
    body,
    params: { chatId: groupId },
  } = req;
  let data;
  try {
    data = await Validators.editGroupPermsAndExps.validate(body, {
      abortEarly: false,
      stripUnknown: true,
    });
  } catch (err) {
    await RH.CustomError({ err, errorClass: CustomError.ValidationError });
  }

  data.exceptions.forEach((exception) => {
    if (exception.restrictUntil != "forever") {
      exception.restrictUntil = {
        forever: false,
        date: new Date(exception.specificTime),
      };

      // exception.restrictUntil = dateCalculator(exception.restrictUntil, 1);
    } else {
      exception.restrictUntil = {
        forever: true,
      };
    }
  });
  const updated = await Services.findByIdAndUpdate('chat',
    groupId,
    {
      $set: { userPermissionsAndExceptions: data },
    },
    { new: true }
  );
  RH.SendResponse({ res, statusCode: StatusCodes.OK, title: "ok" });
};
const editGroupInfo = async (req, res) => {
  const {
    body,
    params: { chatId: groupId },
    file,
  } = req;
  let data;
  try {
    data = await Validators.editGroupInfo.validate(body, {
      stripUnknown: true,
      abortEarly: false,
    });
  } catch (err) {
    await RH.CustomError({ err, errorClass: CustomError.ValidationError });
  }

  const group = await Services.findOne('chat',{ _id: groupId });
  if (!group) {
    await RH.CustomError({
      errorClass: CustomError.BadRequestError,
      errorType: ErrorMessages.NotFoundError,
      Field: Fields.group,
    });
  }
  if (file) {
    group.profilePic = file.path;
  } else {
    group.profilePic = undefined;
  }
  await fileController.deleteFile(group.profilePic);

  const updated = await Services.findByIdAndUpdate('chat',groupId, {
    $set: {
      name: data.name,
      decription: data.description,
      profilePic: group.profilePic,
    },
  });

  RH.SendResponse({ res, statusCode: StatusCodes.OK, title: "ok" });
};

const getMembers = async (req, res) => {
  const { id: groupId } = req.params;
  const chat = await Services.findOne('chat',{ _id: groupId });
  const memberIds = chat.members.map((member) => member.memberId);
  const members = await Services.findMany('user',
    { _id: { $in: memberIds } },
    { profilePic: 1 , name:1 , lastName:1, status:1 }
  );
  RH.SendResponse({
    res,
    statusCode: StatusCodes.OK,
    title: "ok",
    value: {
      members,
    },
  });
};

export {
  addMember,
  editGroupInfo,
  editGroupPermissions,
  editGroupType,
  removeMember,
  getMembers
};
