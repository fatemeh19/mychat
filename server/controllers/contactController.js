import * as CustomError  from "../errors/index.js";
import { StatusCodes } from "http-status-codes";
import * as Services from "../services/index.js";
import ErrorMessages from "../messages/errors.js";
import Fields from "../messages/fields.js";
import * as Validators from "../validators/index.js";
import * as RH from"../middlewares/ResponseHandler.js"

const addContact = async (req, res) => {
  const { userId } = req.user;
  let data;
  try {
    data = await Validators.addContact.validate(req.body, {
      stripUnknown: true,
      abortEarly: false,
    });
  } catch (err) {
    await RH.CustomError({ err, errorClass: CustomError.ValidationError });
  }
  const contact = await Services.User.findUser({
    phoneNumber: data.phoneNumber,
  });
  if (!contact) {
    await RH.CustomError({
      errorClass: CustomError.BadRequestError,
      errorType: ErrorMessages.NotSignUpYet,
    });
  }
  data.userId = contact._id;

  const user = await Services.User.findUser({ _id: userId });
  if (user.phoneNumber == contact.phoneNumber) {
    await RH.CustomError({
      errorClass: CustomError.BadRequestError,
      errorType: ErrorMessages.notAllowedError,
    });
  }
  const { contactExists, contactNameExists } = await user.hasThisContactOrName(
    data
  );
  if (contactExists) {
    await RH.CustomError({
      errorClass: CustomError.BadRequestError,
      errorType: ErrorMessages.DuplicateError,
      Field: Fields.phoneNumber,
    });
  }
  if (contactNameExists) {
    await RH.CustomError({
      errorClass: CustomError.BadRequestError,
      errorType: ErrorMessages.DuplicateError,
      Field: Fields.name,
    });
  }

  const newContact = {
    userId: contact._id,
    name: data.name,
  };
  await Services.User.findAndUpdateUser(user._id, {
    $push: { contacts: newContact },
  });

  await RH.SendResponse({
    res,
    statusCode: StatusCodes.OK,
    title: "ok",
  });
};

const getContacts = async (req, res) => {
  const { userId } = req.user;
  const user = await Services.User.findUser({ _id: userId });
  let contactIds = user.contacts;

  contactIds = contactIds.map((contact) => contact.userId);
  const contacts = await Services.User.findUsers(
    { _id: { $in: contactIds } },
    "name profilePic",
    "name"
  );
  await RH.SendResponse({
    res,
    statusCode: 200,
    title: "ok",
    value: { contacts },
  });
};
const getContact = async (req, res) => {
  const {
    params: { id: contactId },
    user: { userId },
  } = req;
  //   const user = await User.Services.User.findUser({_id:userId})
  //   const contacts = user.contacts.map((contact)=> contact.userId)
  //   if(!contacts.includes(contactId)){
  //     await RH.CustomError({
  //         errorClass:   NotFoundError,
  //         errorType: ErrorMessages.NotFoundError,
  //         Field: Fields.name,
  //       });
  //   }

  const contact = await Services.User.findUser(
    { _id: contactId },
    "name phoneNumber profilePic bio"
  );
  if (!contact) {
    return await RH.CustomError({
      errorClass: CustomError.NotFoundError,
      errorType: ErrorMessages.NotFoundError,
      Field: Fields.contact,
    });
  }
  await RH.SendResponse({
    res,
    statusCode: 200,
    title: "ok",
    value: { contact },
  });
};

export { addContact, getContacts, getContact };
