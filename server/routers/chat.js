import express from 'express'
const router = express.Router()


import {createChat,getChat,getChats} from '../controllers/chatController.js'
router.route('/').post(createChat).get(getChats)
router.get('/:contactId',getChat)




export default router