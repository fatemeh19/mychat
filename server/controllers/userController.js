const User = require("../models/User");
const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");
const services = require("../services");
const ErrorMessages = require("../messages/errors.json");
const Fields = require("../messages/fields.json");
const validators = require("../validators");
const path = require("path");
const {
  RHCustomError,
  RHSendResponse,
} = require("../middlewares/ResponseHandler");
const setInfo = async (req, res) => {
  console.log(req.body);
  const {
    user: { userId },
    body: { name, phoneNumber },
  } = req;
  // try {
  //   data = validators.setInfo.validate(req.body, {
  //     abortEarly: false,
  //     stripUnknown: true,
  //   });
  // } catch (err) {
  //    console.log("err")
  //   // await RHCustomError({ err, errorClass: CustomError.ValidationError });
  // }
  let url = "";
  if (req.file) {
    url = path.join(process.cwd(), "../", req.file.path);
  }

  const update = {
    name: name,
    phoneNumber: phoneNumber,
    profilePic: url,
  };
  const user = await services.User.findAndUpdateUser(userId, update);

  if (!user) {
    await RHCustomError({
      errorClass: CustomError.NotFoundError,
      errorType: ErrorMessages.NotFoundError,
      Field: Fields.user,
    });
  }

  await RHSendResponse({
    res,
    statusCode: StatusCodes.OK,
    title: "ok",
  });
};

const addContact = async (req, res) => {
  const { userId } = req.user;
  let data;
  try {
    data = await validators.addContact.validate(req.body, {
      stripUnknown: true,
      abortEarly: false,
    });
  } catch (err) {
    await RHCustomError({ err, errorClass: CustomError.ValidationError });
  }
  const contact = await services.User.findUser({
    phoneNumber: data.phoneNumber,
  });
  if (!contact) {
    await RHCustomError({
      errorClass: CustomError.BadRequestError,
      errorType: ErrorMessages.NotSignUpYet,
    });
  }
  data.userId = contact._id;

  const user = await services.User.findUser({ _id: userId });
  if (user.phoneNumber == contact.phoneNumber) {
    await RHCustomError({
      errorClass: CustomError.BadRequestError,
      errorType: ErrorMessages.notAllowedError,
    });
  }
  const { contactExists, contactNameExists } = await user.hasThisContactOrName(
    data
  );
  if (contactExists) {
    await RHCustomError({
      errorClass: CustomError.BadRequestError,
      errorType: ErrorMessages.DuplicateError,
      Field: Fields.phoneNumber,
    });
  }
  if (contactNameExists) {
    await RHCustomError({
      errorClass: CustomError.BadRequestError,
      errorType: ErrorMessages.DuplicateError,
      Field: Fields.name,
    });
  }

  // await services.User.addNewContact(user, {
  //   userId: contact._id,
  //   name: data.name,
  // });
  const newContact = {
    userId: contact._id,
    name: data.name,
  };
  await services.User.findAndUpdateUser(user._id, {
    $push: { contacts: newContact },
  });

  await RHSendResponse({
    res,
    statusCode: StatusCodes.OK,
    title: "ok",
  });
};

const getContacts = async (req, res) => {
  const { userId } = req.user;
  const user = await services.User.findUser({ _id: userId });
  let contactIds = user.contacts;

  contactIds = contactIds.map((contact) => contact.userId);
  const contacts = await services.User.findUsers(
    { _id: { $in: contactIds } },
    "name phoneNumber profilePic",
    "name"
  );
  await RHSendResponse({ res, statusCode: 200, title: "ok" ,value:{contacts}});
};

module.exports = { setInfo, addContact, getContacts };
