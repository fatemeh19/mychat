import express from 'express'
const router = express.Router()
import uploadFile from "../utils/multer.js";

import { createMessage } from '../controllers/messageController.js'

router.route('/:chatId').post(uploadFile.single('file'),createMessage)

export default router