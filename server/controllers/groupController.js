import * as Services from "../services/index.js";
import * as Validators from "../validators/index.js";
import * as CustomError from "../errors/index.js";
import * as RH from "../middlewares/ResponseHandler.js";
import { StatusCodes } from "http-status-codes";
import Chat from "../models/Chat.js";
import dateCalculator from "../utils/date.js";
import ErrorMessages from "../messages/errors.js";
import Fields from "../messages/fields.js";
import createRandomInviteLink from "../utils/createInviteLink.js";
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

const getGroupByLink = async (req, res) => {
  const {
    params: { link },
    user: { userId },
  } = req;

  const group = await Services.Chat.getChat({ "inviteLinks.link": link });

  if (!group) {
    await RH.CustomError({
      errorClass: CustomError.NotFoundError,
      errorType: ErrorMessages.NotFoundError,
      Field: Fields.group,
    });
  }
  let isMember = false;
  group.memberIds.forEach((memberId) => {
    if (memberId.equals(userId)) {
      isMember = true;
    }
  });
  let title;
  let joinedBefore;
  if (isMember) {
    title = "joinedAlready";
    joinedBefore = true;
  } else {
    title = "notJoinedYet";
    joinedBefore = false;
  }
  RH.SendResponse({
    res,
    statusCode: StatusCodes.OK,
    title,
    value: { group, joinedBefore },
  });
};
const joinGroupViaLink = async (req,res)=>{
  
}
const createInviteLink = async (req, res) => {
  const {
    body,
    params: { chatId: groupId },
    user: { userId },
  } = req;
  let data;
  try {
    data = await Validators.createInviteLink.validate(body, {
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
  const newInviteLink = {
    name: "",
    expireDate: {
      noLimit: data.expireDate.noLimit,
      expiresIn: data.expireDate.expiresIn
        ? Date(data.expireDate.expiresIn)
        : undefined,
    },
    limitForJoin: {
      noLimit: data.limitForJoin.noLimit,
      limit: data.limitForJoin.limit || undefined,
    },
    creator: userId,
    link: createRandomInviteLink(),
  };
  newInviteLink.name = data.name || newInviteLink.link.slice(0, 10);
  group.inviteLinks.push(newInviteLink);
  const updated = await group.save();

  RH.SendResponse({ res, statusCode: StatusCodes.OK, title: "ok" });
};

const editInviteLink = async (req, res) => {
  const {
    body,
    params: { chatId: groupId, index },
    user: { userId },
  } = req;
  let data;
  try {
    data = await Validators.createInviteLink.validate(body, {
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
  const InviteLink = {
    name: "",
    expireDate: {
      noLimit: data.expireDate.noLimit,
      expiresIn: data.expireDate.expiresIn
        ? Date(data.expireDate.expiresIn)
        : undefined,
    },
    limitForJoin: {
      noLimit: data.limitForJoin.noLimit,
      limit: data.limitForJoin.limit || undefined,
    },
    creator: group.inviteLinks[index].creator,
    link: group.inviteLinks[index].link,
    revoke: data.revoke || group.inviteLinks[index].revoke,
  };
  InviteLink.name = data.name ? data.name : group.inviteLinks[index].name;

  let updateQuery = { $set: {} };
  updateQuery["$set"]["inviteLinks." + index] = InviteLink;
  const updated = await Services.Chat.findAndUpdateChat(groupId, updateQuery, {
    new: true,
  });
  RH.SendResponse({ res, statusCode: StatusCodes.OK, title: "ok" });
};

const deleteInviteLink = async (req, res) => {
  const {
    params: { chatId: groupId, index },
  } = req;
  const group = await Services.Chat.getChat({ _id: groupId });
  if (!group) {
    await RH.CustomError({
      errorClass: CustomError.BadRequestError,
      errorType: ErrorMessages.NotFoundError,
      Field: Fields.group,
    });
  }

  // group.inviteLinks[index].splice(index,1)
  // const updated = await group.save()

  let updateQuery = { $unset: {} };
  updateQuery["$unset"]["inviteLinks." + index] = 1;

  await Services.Chat.findAndUpdateChat(groupId, updateQuery, {
    new: true,
  });
  const updated = await Services.Chat.findAndUpdateChat(
    groupId,
    { $pull: { inviteLinks: null } },
    {
      new: true,
    }
  );

  RH.SendResponse({ res, statusCode: StatusCodes.OK, title: "ok" });
};

const revokeLink = async (req, res) => {
  const {
    params: { chatId: groupId, index },
  } = req;
  let updateQuery = { $set: {} };

  if (index == 0) {
    updateQuery["$set"]["inviteLinks." + index + ".link"] = createRandomInviteLink();

  } else {
    updateQuery["$set"]["inviteLinks." + index + ".revoke"] = true;
    
  }

  const updated = await Services.Chat.findAndUpdateChat(
    groupId,
    updateQuery,
    {
      new: true,
    }
  );
  RH.SendResponse({ res, statusCode: StatusCodes.OK, title: "ok" });
};

export {
  getGroupByLink,
  addMember,
  editGroupType,
  removeMember,
  editGroupPermissions,
  createInviteLink,
  editInviteLink,
  deleteInviteLink,
  revokeLink
};
