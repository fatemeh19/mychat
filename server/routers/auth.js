import express from 'express'
const router = express.Router()
import { register, verifyEmail, login } from "../controllers/authController.js"

router.post("/register", register);
router.post("/verifyEmail", verifyEmail);
router.post("/login", login)

export default router 