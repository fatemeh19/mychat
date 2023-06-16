const express = require("express");
const router = express.Router();

const {
  addContact,
  getContacts,
  getContact,
} = require("../controllers/contactController");

router.post("/", addContact);
router.get("/", getContacts);
router.get("/:id", getContact);

module.exports = router;
