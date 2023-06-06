const express = require("express");
const router = express.Router();

const uploadFile = require('../utils/multer')

const { setInfo } = require("../controllers/userController");

router.post("/setInfo",uploadFile.single('profilePic'), setInfo);
module.exports = router;
