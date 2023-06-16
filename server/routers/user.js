const express = require("express");
const router = express.Router();

const uploadFile = require("../utils/multer");

const { setInfo, addContact } = require("../controllers/userController");

router.patch("/setInfo", uploadFile.single("profilePic"), setInfo);

router.post('/addContact', addContact);
module.exports = router;
