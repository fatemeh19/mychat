import * as Services from "../services/index.js";
import * as Validators from "../validators/index.js";
import * as CustomError from "../errors/index.js";
import * as RH from "../middlewares/ResponseHandler.js";
import { StatusCodes } from "http-status-codes";

const addMember = async (req, res) => {
  // if it has joined by link
  // if new member has privacy limitations send suitable error
  // limitations for number of members
  const {
    body: { memberId },
    params: { chatId: groupId },
  } = req;
  const addToGroupResult = await Services.Chat.findAndUpdateChat(groupId, {
    $push: { members:{memberId} },
  });
  // console.log(addToGroupResult);
  RH.SendResponse({ res, statusCode: StatusCodes.OK, title: "ok" });
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

  await Services.Chat.findAndUpdateChat(
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

const removeMember = async (req, res) => {
  const {
    params: { chatId: groupId, memberId },
  } = req;
  const removeFromGroupResult = await Services.Chat.findAndUpdateChat(groupId, {
    $pull: { members:{memberId: memberId} },
  });
  console.log(removeFromGroupResult);
  RH.SendResponse({ res, statusCode: StatusCodes.OK, title: "ok" });
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
  const updated = await Services.Chat.findAndUpdateChat(
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

  const group = await Services.Chat.getChat({ _id: groupId });
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

  const updated = await Services.Chat.findAndUpdateChat(groupId, {
    $set: {
      name: data.name,
      decription: data.description,
      profilePic: group.profilePic,
    },
  });

  RH.SendResponse({ res, statusCode: StatusCodes.OK, title: "ok" });
};



export {
  addMember,
  editGroupType,
  removeMember,
  editGroupPermissions,
  editGroupInfo,

};
