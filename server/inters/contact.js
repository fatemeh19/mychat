import * as CustomError from "../errors/index.js";
import { StatusCodes } from "http-status-codes";
import * as RH from "../middlewares/ResponseHandler.js";
import messages from "../messages/messages.js";

import {
  addContact,
  getContacts,
  getContact,
  editContact,
} from "../controllers/contactController.js";
const addContactI = async (req, res,next) => {
  const {
    body,
    user: { userId },
  } = req;

  await addContact(userId, body);

  res.locals.response = {
    statusCode : StatusCodes.OK,
    responseType:messages.ok
  }
  next()
};

const getContactsI = async (req, res,next) => {
  const { userId } = req.user;
  const contacts = await getContacts(userId);

  
  res.locals.response = {
    statusCode : StatusCodes.OK,
    value: { contacts },
    responseType:messages.ok
  }
  next()
};
const getContactI = async (req, res,next) => {
  const {
    params: { id: contactId },
    user: { userId },
  } = req;
  const contact = await getContact(userId, contactId);

  res.locals.response = {
    statusCode : StatusCodes.OK,
    value: { contact },
    responseType:messages.ok
  }
  next()
};

const editContactI = async (req, res,next) => {
  const {
    params: { id },
    body,
    user: { userId },
  } = req;
  await editContact(body, userId, id);
  res.locals.response = {
    statusCode : StatusCodes.OK,
    responseType:messages.ok
  }
  next()
};

export { editContactI, addContactI, getContactsI, getContactI };
