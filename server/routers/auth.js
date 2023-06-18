import express from 'express'
const router = express.Router()
// register, login, forgetpassword,resetpassword, verifyemail, logout
import { register, verifyEmail, login } from "../controllers/authController.js"

router.post("/register", register);
router.post("/verifyEmail", verifyEmail);
router.post("/login", login)

export default router