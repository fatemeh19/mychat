import express from 'express';
const router = express.Router()

import {
  addContactI,
  getContactsI,
  getContactI,
  editContactI
} from "../inters/contact.js";

router.post("/", addContactI);
router.get("/", getContactsI);
router.get("/:id", getContactI);
router.put("/:id", editContactI);


export default router
