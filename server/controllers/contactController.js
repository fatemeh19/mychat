import {
  NotFoundError,
  UnauthorizedError,
  UnauthenticatedError,
  ValidationError,
  BadRequestError,
} from "../errors/index.js";
import { StatusCodes } from "http-status-codes";
import { findUsers, findUser, findAndUpdateUser } from "../services/User.js";
import ErrorMessages from "../messages/errors.js";
import Fields from "../messages/fields.js";
import { addContactV } from "../validators/index.js";
import {
  RHCustomError,
  RHSendResponse,
} from "../middlewares/ResponseHandler.js";

const addContact = async (req, res) => {
  const { userId } = req.user;
  let data;
  try {
    data = await addContactV.validate(req.body, {
      stripUnknown: true,
      abortEarly: false,
    });
  } catch (err) {
    await RHCustomError({ err, errorClass: ValidationError });
  }
  const contact = await findUser({
    phoneNumber: data.phoneNumber,
  });
  if (!contact) {
    await RHCustomError({
      errorClass: BadRequestError,
      errorType: ErrorMessages.NotSignUpYet,
    });
  }
  data.userId = contact._id;

  const user = await findUser({ _id: userId });
  if (user.phoneNumber == contact.phoneNumber) {
    await RHCustomError({
      errorClass: BadRequestError,
      errorType: ErrorMessages.notAllowedError,
    });
  }
  const { contactExists, contactNameExists } = await user.hasThisContactOrName(
    data
  );
  if (contactExists) {
    await RHCustomError({
      errorClass: BadRequestError,
      errorType: ErrorMessages.DuplicateError,
      Field: Fields.phoneNumber,
    });
  }
  if (contactNameExists) {
    await RHCustomError({
      errorClass: BadRequestError,
      errorType: ErrorMessages.DuplicateError,
      Field: Fields.name,
    });
  }

  const newContact = {
    userId: contact._id,
    name: data.name,
  };
  await findAndUpdateUser(user._id, {
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
  const user = await findUser({ _id: userId });
  let contactIds = user.contacts;

  contactIds = contactIds.map((contact) => contact.userId);
  const contacts = await findUsers(
    { _id: { $in: contactIds } },
    "name profilePic",
    "name"
  );
  await RHSendResponse({
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
  //   const user = await User.findUser({_id:userId})
  //   const contacts = user.contacts.map((contact)=> contact.userId)
  //   if(!contacts.includes(contactId)){
  //     await RHCustomError({
  //         errorClass:   NotFoundError,
  //         errorType: ErrorMessages.NotFoundError,
  //         Field: Fields.name,
  //       });
  //   }

  const contact = await findUser(
    { _id: contactId },
    "name phoneNumber profilePic bio"
  );
  if (!contact) {
    return await RHCustomError({
      errorClass: NotFoundError,
      errorType: ErrorMessages.NotFoundError,
      Field: Fields.contact,
    });
  }
  await RHSendResponse({
    res,
    statusCode: 200,
    title: "ok",
    value: { contact },
  });
};

export { addContact, getContacts, getContact };
