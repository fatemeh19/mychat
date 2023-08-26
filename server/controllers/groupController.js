import { StatusCodes } from "http-status-codes";
import * as CustomError from "../errors/index.js";
import * as RH from "../middlewares/ResponseHandler.js";
import * as Services from "../services/dbServices.js";
import * as Validators from "../validators/index.js";
import * as fileController from "../utils/file.js";
import { objectId } from "../utils/typeConverter.js";
import ValidationError from "../errors/ValidationError.js";
const addMember = async (groupId, memberId) => {
  // if it has joined by link
  // if new member has privacy limitations send suitable error
  // limitations for number of members
  // const {
  //   body: { memberId },
  //   params: { chatId: groupId },
  // } = req;
  // req.user.userId = memberId;
  // req.params.id = groupId;
  await Services.findByIdAndUpdate("chat", groupId, {
    $push: { members: { memberId, joinedAt: Date.now() } },
  });
};

const editGroupType = async (groupId, body) => {
  let data;
  try {
    data = await Validators.editGroupType.validate(body, {
      abortEarly: false,
      stripUnknown: true,
    });
  } catch (errors) {
    throw new ValidationError(errors);
  }

  await Services.findByIdAndUpdate(
    "chat",
    groupId,
    {
      $set: { groupTypeSetting: data },
    },
    {
      new: true,
    }
  );
};

const removeMember = async (groupId, memberId) => {
  await Services.findByIdAndUpdate("chat", groupId, {
    $pull: { members: { memberId: memberId } },
  });
};

const editGroupPermissions = async (groupId,body) => {
  
  let data;
  try {
    data = await Validators.editGroupPermsAndExps.validate(body, {
      abortEarly: false,
      stripUnknown: true,
    });
  } catch (errors) {
   throw new ValidationError(errors);
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
  await Services.findByIdAndUpdate(
    "chat",
    groupId,
    {
      $set: { userPermissionsAndExceptions: data },
    },
    { new: true }
  );
  // RH.SendResponse({ res, statusCode: StatusCodes.OK, title: "ok" });
};
const editGroupInfo = async (groupId,body) => {
  console.log(body)
  let data;
  try {
    data = await Validators.editGroupInfo.validate(body, {
      stripUnknown: true,
      abortEarly: false,
    });
  } catch (errors) {
   throw new ValidationError(errors);
  }



  
  await Services.findByIdAndUpdate("chat", groupId, {
    $set: {
      name: data.name,
      description: data.description,
    },
  });

};

const getMembers = async (groupId) => {
  const chat = await Services.findOne("chat", { _id: groupId });
  let memberIds = chat.members.map((member) => member.memberId);
  memberIds = await objectId(memberIds);
  const members = await Services.aggregate("user", [
    { $match: { _id: { $in: memberIds } } },
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
        profilePic: 1,
        name: 1,
        lastName: 1,
        status: 1,
      },
    },
  ]);

  return members
  
};

export {
  addMember,
  editGroupInfo,
  editGroupPermissions,
  editGroupType,
  removeMember,
  getMembers,
};
