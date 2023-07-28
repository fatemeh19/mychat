import * as Services from "../services/index.js";
import * as Validators from "../validators/index.js";
import * as CustomError from "../errors/index.js";
import * as RH from "../middlewares/ResponseHandler.js";
import { StatusCodes } from "http-status-codes";
import Chat from "../models/Chat.js";
import dateCalculator from "../utils/date.js";
import ErrorMessages from "../messages/errors.js";
import Fields from "../messages/fields.js";

const addMember = async (req, res) => {
  // if it has joined by link
  // if new member has privacy limitations send suitable error
  // limitations for number of members
  const {
    body: { memberId },
    params: { chatId: groupId },
  } = req;
  const addToGroupResult = await Services.Chat.findAndUpdateChat(groupId, {
    $push: { memberIds: memberId },
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
  console.log(data);

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
    params: { chatId: groupId , memberId },
  } = req;
  const removeFromGroupResult = await Services.Chat.findAndUpdateChat(groupId, {
    $pull: { memberIds: memberId },
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
    if (exception.restrictUntil != "custom") {
      exception.restrictUntil = dateCalculator(exception.restrictUntil, 1);
    } else {
      exception.restrictUntil = new Date(exception.customDate);
    }
  });
  console.log(groupId);
  const updated = await Services.Chat.findAndUpdateChat(
    groupId,
    {
      $set: { userPermissionsAndExceptions: data },
    },
    { new: true }
  );
  RH.SendResponse({ res, statusCode: StatusCodes.OK, title: "ok" });
};

const getGroupByLink = async (req, res) => {
  const { params:{link}, user:{userId} } = req;

  const group = await Services.Chat.getChat({ "inviteLinks.link": link });

  if (!group) {
    await RH.CustomError({
      errorClass: CustomError.NotFoundError,
      errorType: ErrorMessages.NotFoundError,
      Field: Fields.group,
    });
  }
  let isMember = false
  group.memberIds.forEach((memberId)=>{
    if(memberId.equals(userId)){
      isMember = true
    }
  })
  let title
  let joinedBefore 
  if(isMember){
    title = "joinedAlready"
    joinedBefore = true

  }else{
    title = "notJoinedYet"
    joinedBefore = false

  }
  RH.SendResponse({res,statusCode:StatusCodes.OK,title,value:{group, joinedBefore}})

};
const joinViaLink = async (req, res) => {
  

};

export {getGroupByLink, addMember, editGroupType, removeMember, editGroupPermissions };
