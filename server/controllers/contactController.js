import * as CustomError from "../errors/index.js";
import { StatusCodes } from "http-status-codes";
import * as Services from "../services/dbServices.js";
import ErrorMessages from "../messages/errors.js";
import Fields from "../messages/fields.js";
import * as Validators from "../validators/index.js";
import * as RH from "../middlewares/ResponseHandler.js";
import { objectId } from "../utils/typeConverter.js";

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
  const contact = await Services.findOne("user", {
    // $or: [
    // {
    phoneNumber: data.phoneNumber,
    // },
    // {
    //   username: data.username,
    // },
    // ],
  });
  if (!contact) {
    await RH.CustomError({
      errorClass: CustomError.BadRequestError,
      errorType: ErrorMessages.NotSignUpYet,
    });
  }
  data.userId = contact._id;

  const user = await Services.findOne("user", { _id: userId });
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
  };
  await Services.findByIdAndUpdate("user", user._id, {
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
  const user = await Services.findOne("user", { _id: userId });
  let userContacts = user.contacts;

  let contactIds = user.contacts.map((contact) => contact.userId);
  contactIds = await objectId(contactIds);
  
  const conditions = contactIds.map((value, index) => {
    return { $cond: { if: { $eq: [value, "$_id"] }, then: index, else: -1 } };
  });
  const contacts = await Services.aggregate("user", [
    { $match: { _id: { $in: contactIds } } },
    {
      $lookup: {
        from: "files",
        localField: "profilePic",
        foreignField: "_id",
        as: "profilePic",
      },
    },
    { $unwind: "$profilePic" },
    {
      $project: {
        indexes: conditions,
        name: 1,
        lastname: 1,
        profilePic: 1,
        status: 1,
        phoneNumber: 1,
        username: 1,
      },
    },
    {
      $project: {
        name: 1,
        lastname: 1,
        profilePic: 1,
        status: 1,
        phoneNumber: 1,
        username: 1,
        index: {
          $filter: {
            input: "$indexes",
            as: "indexes",
            cond: { $ne: ["$$indexes", -1] },
          },
        },
      },
    },
    { $unwind: "$index" },
  ]);
  contacts.forEach((contact) => {
    contact.name = userContacts[contact.index].name || contact.name;
    contact.lastname = userContacts[contact.index].lastname || contact.lastname;
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
  const user = await Services.findOne("user", { _id: userId });

  const contact = await Services.findOne(
    "user",
    { _id: contactId },
    {
      name: 1,
      lastname: 1,
      phoneNumber: 1,
      profilePic: 1,
      bio: 1,
      status: 1,
      username: 1,
    }
  );
  const profilePic = await Services.findOne("file",{_id:contact.profilePic})
  contact.profilePic = profilePic
  // if (!contact) {
  //   return await RH.CustomError({
  //     errorClass: CustomError.NotFoundError,
  //     errorType: ErrorMessages.NotFoundError,
  //     Field: Fields.contact,
  //   });
  // }

  const userContact = user.contacts.find((userContact) =>
    userContact.userId.equals(contact._id)
  );

  if (userContact) {
    contact.name = userContact.name || contact.name;
    contact.lastname = userContact.lastname || contact.lastname;
  }

  await RH.SendResponse({
    res,
    statusCode: 200,
    title: "ok",
    value: { contact },
  });
};

const editContact = async (req, res) => {
  const {
    params: { id },
    body,
    user: { userId },
  } = req;
  let data;
  try {
    data = await Validators.editContact.validate(body, {
      abortEarly: false,
      stripUnknown: true,
    });
  } catch (err) {
    await RH.CustomError({ err, errorClass: CustomError.ValidationError });
  }

  data.userId = id;
  await Services.findByIdAndUpdate(
    "user",
    userId,
    {
      $set: { "contacts.$[contact]": data },
    },
    {
      arrayFilters: [{ "contact.userId": id }],
      new: true,
    }
  );
  await RH.SendResponse({
    res,
    statusCode: 200,
    title: "ok",
  });
};

export { editContact, addContact, getContacts, getContact };
