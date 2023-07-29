import express from 'express'
const router = express.Router()
import {deleteInviteLink,editInviteLink, createInviteLink } from '../controllers/groupController.js'

router.patch("/:chatId",createInviteLink)
router.patch("/:chatId/:index",editInviteLink)
router.delete("/:chatId/:index",deleteInviteLink)
export default router