import * as CustomError from "../errors/index.js";
import { StatusCodes } from "http-status-codes";
import * as Services from "../services/dbServices.js";
import ErrorMessages from "../messages/errors.js";
import Fields from "../messages/fields.js";
import * as Validators from "../validators/index.js";
import * as RH from "../middlewares/ResponseHandler.js";
import { objectId } from "../utils/typeConverter.js";
import ValidationError from "../errors/ValidationError.js";

const addContact = async (userId,body) => {
  
  let data;
  try {
    data = await Validators.addContact.validate(body, {
      stripUnknown: true,
      abortEarly: false,
    });
  } catch (errors) {
   throw new ValidationError(errors);
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
  },{},false);
  if (!contact) {
    throw new CustomError.BadRequestError(
      ErrorMessages.NotSignUpYet,
     
    );
    
  }
  data.userId = contact._id;

  const user = await Services.findOne("user", { _id: userId });
  if (user.phoneNumber == contact.phoneNumber) {
    throw new CustomError.BadRequestError(
      ErrorMessages.notAllowedError,
    );
  }
  const { contactExists } = await user.hasThisContact(data);
  if (contactExists) {
    throw new CustomError.BadRequestError(
      ErrorMessages.DuplicateError,
      Fields.phoneNumber,
    );
    
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

  
};

const getContacts = async (userId) => {
  
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

  return contacts
};
const getContact = async (userId,contactId) => {
  
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

  return contact
};

const editContact = async (body,userId,id) => {
  
  let data;
  try {
    data = await Validators.editContact.validate(body, {
      abortEarly: false,
      stripUnknown: true,
    });
  } catch (errors) {
   throw new ValidationError(errors);
  }


  // data.userId = id;
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
  
};

export { editContact, addContact, getContacts, getContact };
