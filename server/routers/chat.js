import express from 'express'
const router = express.Router()


import {createChat} from '../controllers/chatController.js'
router.route('/').post(createChat)



export default router