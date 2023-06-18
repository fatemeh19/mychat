import express from 'express';
const router = express.Router()

import {
  addContact,
  getContacts,
  getContact,
} from "../controllers/contactController.js";

router.post("/", addContact);
router.get("/", getContacts);
router.get("/:id", getContact);

export default router
