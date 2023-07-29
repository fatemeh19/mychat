import express from 'express'
const router = express.Router()
import {editInviteLink, createInviteLink } from '../controllers/groupController.js'

router.patch("/:chatId",createInviteLink)
router.patch("/:chatId/:index",editInviteLink)
export default router