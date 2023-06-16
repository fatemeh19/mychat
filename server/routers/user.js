const express = require("express");
const router = express.Router();

const uploadFile = require("../utils/multer");

const {
  setInfo,
  addContact,
  getContacts,
} = require("../controllers/userController");


router.patch("/setInfo", uploadFile.single("profilePic"), setInfo);
router.post("/addContact", addContact);
router.get("/contacts", getContacts);
module.exports = router;
