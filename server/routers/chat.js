import express from 'express'
const router = express.Router()


import {createChat,getChat} from '../controllers/chatController.js'
router.route('/').post(createChat)
router.get('/:contactId',getChat)




export default router