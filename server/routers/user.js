const express = require("express");
const router = express.Router();

const contactRouter = require("./contact");

const uploadFile = require("../utils/multer");

const {
  setInfo,
  addContact,
  getContacts,
} = require("../controllers/userController");
router.use("/contact", contactRouter);

router.patch("/setInfo", uploadFile.single("profilePic"), setInfo);
module.exports = router;
