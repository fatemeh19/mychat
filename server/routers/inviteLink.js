import express from 'express'
const router = express.Router()
import { createInviteLink } from '../controllers/groupController.js'

router.patch("/:chatId",createInviteLink)

export default router