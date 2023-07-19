import express from 'express'
const router = express.Router()


import {createChat,getChat,getChats} from '../controllers/chatController.js'
router.route('/').post(createChat).get(getChat)
router.get('/list',getChats)




export default router