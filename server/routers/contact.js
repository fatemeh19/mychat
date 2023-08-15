import express from 'express';
const router = express.Router()

import {
  addContact,
  getContacts,
  getContact,
  editContact
} from "../controllers/contactController.js";

router.post("/", addContact);
router.get("/", getContacts);
router.get("/:id", getContact);
router.put("/:id", editContact);


export default router
