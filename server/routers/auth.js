import express from 'express'
const router = express.Router()
import { registerI, verifyEmailI, loginI } from "../inters/auth.js"

router.post("/register", registerI);
router.post("/verifyEmail", verifyEmailI);
router.post("/login", loginI)

export default router 