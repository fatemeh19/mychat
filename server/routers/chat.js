import express from 'express'
const router = express.Router()
import groupRouter from "./group.js"

import {createChat,getChat,getChats} from '../controllers/chatController.js'
router.use('/group', groupRouter)
router.route('/').post(createChat).get(getChats)
router.get('/:id',getChat)




export default router