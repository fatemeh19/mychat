import * as RH from "../middlewares/ResponseHandler.js";

import { StatusCodes } from "http-status-codes";

import { addMember,editGroupInfo,editGroupPermissions,editGroupType, getMembers, removeMember } from "../controllers/groupController.js";
const addMemberI = async (req, res, next) => {
  // if it has joined by link
  // if new member has privacy limitations send suitable error
  // limitations for number of members
  const {
    body: { memberId },
    params: { chatId: groupId },
  } = req;
  addMember(groupId, memberId);

  // pass parameters to addToChats
  req.user.userId = memberId;
  req.params.id = groupId;

  next();
};

const editGroupTypeI = async (req, res) => {
  const {
    params: { chatId: groupId },
    body,
  } = req;
  editGroupType()
  
  RH.SendResponse({ res, statusCode: StatusCodes.OK, title: "ok" });
};

const removeMemberI = async (req, res, next) => {
  const {
    params: { chatId: groupId, memberId },
  } = req;
  removeMember(groupId,memberId)
  req.body.deleteAll = false;
  req.params.id = groupId;
  req.user.userId = memberId;
  next();
  // RH.SendResponse({ res, statusCode: StatusCodes.OK, title: "ok" });
};

const editGroupPermissionsI = async (req, res) => {
  const {
    body,
    params: { chatId: groupId },
  } = req;
  editGroupPermissions(groupId,body)
  RH.SendResponse({ res, statusCode: StatusCodes.OK, title: "ok" });
};
const editGroupInfoI = async (req, res) => {
  const {
    body,
    params: { chatId: groupId },
  } = req;
  editGroupInfo(groupId,body)
  
  RH.SendResponse({ res, statusCode: StatusCodes.OK, title: "ok" });
};

const getMembersI = async (req, res) => {
  const { id: groupId } = req.params;
  const members = await getMembers(groupId)
  RH.SendResponse({
    res,
    statusCode: StatusCodes.OK,
    title: "ok",
    value: {
      members,
    },
  });
};

export{
    addMemberI,
    getMembersI,
    editGroupTypeI,
    removeMemberI,
    editGroupPermissionsI,
    editGroupInfoI
}
