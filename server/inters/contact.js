import * as CustomError from "../errors/index.js";
import { StatusCodes } from "http-status-codes";
import * as RH from "../middlewares/ResponseHandler.js";
import {
  addContact,
  getContacts,
  getContact,
  editContact,
} from "../controllers/contactController.js";
const addContactI = async (req, res) => {
  const {
    body,
    user: { userId },
  } = req;

  await addContact(userId, body);

  await RH.SendResponse({
    res,
    statusCode: StatusCodes.OK,
    title: "ok",
  });
};

const getContactsI = async (req, res) => {
  const { userId } = req.user;
  const contacts = await getContacts(userId);

  await RH.SendResponse({
    res,
    statusCode: 200,
    title: "ok",
    value: { contacts },
  });
};
const getContactI = async (req, res) => {
  const {
    params: { id: contactId },
    user: { userId },
  } = req;
  const contact = await getContact(userId, contactId);

  await RH.SendResponse({
    res,
    statusCode: 200,
    title: "ok",
    value: { contact },
  });
};

const editContactI = async (req, res) => {
  const {
    params: { id },
    body,
    user: { userId },
  } = req;
  await editContact(body, userId, id);
  await RH.SendResponse({
    res,
    statusCode: 200,
    title: "ok",
  });
};

export { editContactI, addContactI, getContactsI, getContactI };
