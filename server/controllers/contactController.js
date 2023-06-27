import * as CustomError from "../errors/index.js";
import { StatusCodes } from "http-status-codes";
import * as Services from "../services/index.js";
import ErrorMessages from "../messages/errors.js";
import Fields from "../messages/fields.js";
import * as Validators from "../validators/index.js";
import * as RH from "../middlewares/ResponseHandler.js";

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
  const { contactExists } = await user.hasThisContact(data);
  if (contactExists) {
    await RH.CustomError({
      errorClass: CustomError.BadRequestError,
      errorType: ErrorMessages.DuplicateError,
      Field: Fields.phoneNumber,
    });
  }
  // if (contactNameExists) {
  //   await RH.CustomError({
  //     errorClass: CustomError.BadRequestError,
  //     errorType: ErrorMessages.DuplicateError,
  //     Field: Fields.name,
  //   });
  // }

  const newContact = {
    userId: contact._id,
    name: data.name,
    lastname: data.lastname,
    profilePic: data.profilePic,
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
  let userContacts = user.contacts

  contactIds = contactIds.map((contact) => contact.userId);
  const contacts = await Services.User.findUsers(
    { _id: { $in: contactIds } },
    "name lastname profilePic",
    "_id"
  );
  contacts.forEach((contact, index) => {
    contact.name = userContacts[index].name || contact.name;
    contact.lastname = userContacts[index].lastname || contact.lastname;
    contact.profilePic = userContacts[index].profilePic || contact.profilePic;
  });
  
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
    const user = await Services.User.findUser({_id:userId})
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
    "name lastname phoneNumber profilePic bio"
  );
  if (!contact) {
    return await RH.CustomError({
      errorClass: CustomError.NotFoundError,
      errorType: ErrorMessages.NotFoundError,
      Field: Fields.contact,
    });
  }

  const userContact= user.contacts.find((userContact) => userContact.userId.equals(contact._id));
  
  contact.name = userContact.name || contact.name;
  contact.lastname = userContact.lastname || contact.lastname;
  contact.profilePic = userContact.profilePic || contact.profilePic;

  await RH.SendResponse({
    res,
    statusCode: 200,
    title: "ok",
    value: { contact },
  });
};


export { addContact, getContacts, getContact };
