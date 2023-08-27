import { StatusCodes } from "http-status-codes";
import * as CustomError from "../errors/index.js";
import * as RH from "../middlewares/ResponseHandler.js";
import * as Services from "../services/dbServices.js";
import * as Validators from "../validators/index.js";
import * as fileController from "../utils/file.js";
import { objectId } from "../utils/typeConverter.js";
import ValidationError from "../errors/ValidationError.js";
const addMember = async (groupId, memberId) => {
 
  
  // if new member has privacy limitations send suitable error
  
  Services.findByIdAndUpdate("chat", groupId, {
    $push: { members: { memberId, joinedAt: Date.now() } },
  });
  const member = await Services.findOne('user',{_id:memberId})
  return member
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

  const editedGroupType = await Services.findByIdAndUpdate(
    "chat",
    groupId,
    {
      $set: { groupTypeSetting: data },
    },
    {
      new: true,
    }
  );
  return editedGroupType
};

const removeMember = async (groupId, memberId) => {
  await Services.findByIdAndUpdate("chat", groupId, {
    $pull: { members: { memberId: memberId } },
  });
  const member = await Services.findOne('user',{_id:memberId})
  return member
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
  const editedGroupPermissions = await Services.findByIdAndUpdate(
    "chat",
    groupId,
    {
      $set: { userPermissionsAndExceptions: data },
    },
    { new: true }
  );
  return editedGroupPermissions
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



  
  const editedGroupInfo = await Services.findByIdAndUpdate("chat", groupId, {
    $set: {
      name: data.name,
      description: data.description,
    },
  });
  return editedGroupInfo

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
