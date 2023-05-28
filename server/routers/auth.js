const express = require("express");
const router = express.Router();

// register, login, forgetpassword,resetpassword, verifyemail, logout
const { register, verifyEmail, login } = require("../controllers/authController");

router.post("/register", register);
router.post("/verifyEmail", verifyEmail);
router.post("/login", login)

module.exports = router;
