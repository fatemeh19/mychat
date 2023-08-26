import * as RH from "../middlewares/ResponseHandler.js";

import { StatusCodes } from "http-status-codes";
import messages from "../messages/messages.js";

import { addMember,editGroupInfo,editGroupPermissions,editGroupType, getMembers, removeMember } from "../controllers/groupController.js";
const addMemberI = async (req, res, next) => {
  // if it has joined by link
  // if new member has privacy limitations send suitable error
  // limitations for number of members
  const {
    body: { memberId },
    params: { chatId: groupId },
  } = req;
  await addMember(groupId, memberId);

  // pass parameters to addToChats
  req.user.userId = memberId;
  req.params.id = groupId;

  res.locals.response = {
    statusCode : StatusCodes.OK,
    responseType:messages.ok
  }

  next();
};

const editGroupTypeI = async (req, res, next) => {
  const {
    params: { chatId: groupId },
    body,
  } = req;
  await editGroupType(groupId,body)
  
  res.locals.response = {
    statusCode : StatusCodes.OK,
    responseType:messages.ok
  }
  next()
};

const removeMemberI = async (req, res, next) => {
  const {
    params: { chatId: groupId, memberId },
  } = req;
  await removeMember(groupId,memberId)
  req.body.deleteAll = false;
  req.params.id = groupId;
  req.user.userId = memberId;

  res.locals.response = {
    statusCode : StatusCodes.OK,
    responseType:messages.ok
  }
  next();
  // RH.SendResponse({ res, statusCode: StatusCodes.OK, title: "ok" });
};

const editGroupPermissionsI = async (req, res, next) => {
  const {
    body,
    params: { chatId: groupId },
  } = req;
  await editGroupPermissions(groupId,body)
  res.locals.response = {
    statusCode : StatusCodes.OK,
    responseType:messages.ok
  }
  next()};
const editGroupInfoI = async (req, res, next) => {
  const {
    body,
    params: { chatId: groupId },
  } = req;
  await editGroupInfo(groupId,body)
  
  res.locals.response = {
    statusCode : StatusCodes.OK,
    responseType:messages.ok
  }
  next()
};

const getMembersI = async (req, res, next) => {
  const { id: groupId } = req.params;
  const members = await getMembers(groupId)
  res.locals.response = {
    statusCode : StatusCodes.OK,
    value: {
      members
    },
    responseType:messages.ok
  }
  next()
};

export{
    addMemberI,
    getMembersI,
    editGroupTypeI,
    removeMemberI,
    editGroupPermissionsI,
    editGroupInfoI
}
