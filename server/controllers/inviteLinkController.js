import * as Services from "../services/index.js";
import * as Validators from "../validators/index.js";
import * as CustomError from "../errors/index.js";
import * as RH from "../middlewares/ResponseHandler.js";
import { StatusCodes } from "http-status-codes";
import ErrorMessages from "../messages/errors.js";
import Fields from "../messages/fields.js";
import createRandomInviteLink from "../utils/createInviteLink.js";
import * as fileController from "../utils/file.js";

const getGroupByLink = async (req, res) => {
  const {
    params: { link },
    user: { userId },
  } = req;
  const group = await Services.Chat.getChat({
    inviteLinks: {
      $elemMatch: {
        $and: [
          { link: link, revoked: false },
          {
            $or: [
              { "expireDate.noLimit": true },
              { "expireDate.expiresIn": { $gte: new Date(Date.now()) } },
            ],
          },
        ],
      },
    },
  });
  if (!group ) {
    await RH.CustomError({
      errorClass: CustomError.BadRequestError,
      errorType: ErrorMessages.ExpiredError,
      Field: Fields.link,
    });
  }
 let outOfLimit = false
  group.inviteLinks.forEach((inviteLink) => {
    if (inviteLink.link == link) {
      if (inviteLink.limitForJoin.noLimit == false) {
        if (
          inviteLink.limitForJoin.limit <
          inviteLink.limitForJoin.joinedUsers.length + 1
        ) {
            outOfLimit = true
            // full
        }
      }
    }
  });
  if (outOfLimit ) {
    await RH.CustomError({
      errorClass: CustomError.BadRequestError,
      errorType: ErrorMessages.ExpiredError,
      Field: Fields.link,
    });
  }

  //   const group = await Services.Chat.aggregateChats([
  //     {
  //       $project: {
  //         inviteLinks:1,
  //         inviteLinks: {
  //           $filter: {
  //             input: "$inviteLinks",
  //             as: "inviteLink",
  //             cond: {
  //               $and: [
  //                 { $eq: ["$$inviteLink.link", link] },

  //                 {
  //                   $or: [
  //                     { $eq: ["$$inviteLink.expireDate.noLimit", true] },
  //                     {
  //                       gte: [
  //                         "$$inviteLink.expireDate.expiresIn",
  //                         new Date(Date.now()),
  //                       ],
  //                     },
  //                   ],
  //                 },
  //                 {
  //                   $or: [
  //                     {  $eq: ["$$inviteLink.limitForJoin.noLimit", true]},
  //                     {
  //                       $gt: [
  //                         "$$inviteLink.limitForJoin.limit",
  //                         { $size: "$$inviteLink.limitForJoin.joinedUsers" },
  //                       ],
  //                     },
  //                   ],
  //                 },
  //               ],
  //             },

  //           },
  //         },
  //       },
  //     },
  //   ]);


  
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
const joinGroupViaLink = async (req, res) => {
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
  let inviteLinkIndex;
  group.inviteLinks.forEach((inviteLink, index) => {
    if (inviteLink.link == link) {
      inviteLinkIndex = index;
    }
  });
  if (
    inviteLinkIndex != 0 &&
    group.inviteLinks[inviteLinkIndex].limitForJoin.joinedUsers.length + 1 >
      group.inviteLinks[inviteLinkIndex].limitForJoin.limit
  ) {
    return RH.CustomError({
      errorClass: CustomError.BadRequestError,
      errorType: ErrorMessages.FullError,
      Field: Fields.joinUsersLimit,
    });
  }
  group.memberIds.forEach((memberId) => {
    if (memberId.equals(userId)) {
      // is a member already
      return RH.CustomError({
        errorClass: CustomError.BadRequestError,
        errorType: ErrorMessages.DuplicateError,
        Field: Fields.member,
      });
      // return console.log("is a member already");
    }
  });
  let updateQuery = { $push: {} };
  updateQuery["$push"]["memberIds"] = userId;
  updateQuery["$push"][
    "inviteLinks." + inviteLinkIndex + ".limitForJoin.joinedUsers"
  ] = userId;
  const updated = await Services.Chat.findAndUpdateChat(
    group._id,
    updateQuery,
    { new: true }
  );
  RH.SendResponse({ res, statusCode: StatusCodes.OK, title: "ok" });
};
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
        ? new Date(data.expireDate.expiresIn)
        : undefined,
    },
    limitForJoin: {
      noLimit: data.limitForJoin.noLimit,
      limit: data.limitForJoin.limit || undefined,
      joinedUsers:group.inviteLinks[index].limitForJoin.joinedUsers
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
    updateQuery["$set"]["inviteLinks." + index + ".link"] =
      createRandomInviteLink();
  } else {
    updateQuery["$set"]["inviteLinks." + index + ".revoked"] = true;
  }

  const updated = await Services.Chat.findAndUpdateChat(groupId, updateQuery, {
    new: true,
  });
  RH.SendResponse({ res, statusCode: StatusCodes.OK, title: "ok" });
};

export {
  getGroupByLink,
  createInviteLink,
  editInviteLink,
  deleteInviteLink,
  revokeLink,
  joinGroupViaLink,
};
