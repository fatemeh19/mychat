import express from 'express'
const router = express.Router()


import {createChat,getChat,getChats} from '../controllers/chatController.js'
router.route('/').post(createChat).get(getChats)
router.get('/',getChat)




export default router