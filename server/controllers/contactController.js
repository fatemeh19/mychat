const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");
const services = require("../services");
const ErrorMessages = require("../messages/errors.json");
const Fields = require("../messages/fields.json");
const validators = require("../validators");
const {
  RHCustomError,
  RHSendResponse,
} = require("../middlewares/ResponseHandler");
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
  //   const user = await services.User.findUser({_id:userId})
  //   const contacts = user.contacts.map((contact)=> contact.userId)
  //   if(!contacts.includes(contactId)){
  //     await RHCustomError({
  //         errorClass: CustomError.NotFoundError,
  //         errorType: ErrorMessages.NotFoundError,
  //         Field: Fields.name,
  //       });
  //   }
  
  
   const contact = await services.User.findUser({ _id: contactId },'name phoneNumber profilePic bio');
  if (!contact) {
    return await RHCustomError({
      errorClass: CustomError.NotFoundError,
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

module.exports = { addContact, getContacts, getContact };
