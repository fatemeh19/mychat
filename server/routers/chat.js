import express from 'express'
const router = express.Router()
import groupRouter from "./group.js"
import uploadFile from "../utils/multer.js"
import {pinUnpinChat,createChat,getChat,getChats} from '../controllers/chatController.js'
router.use('/group', groupRouter)
router.route('/').post(uploadFile.single('profilePic'),createChat).get(getChats)
router.get('/:id',getChat)
router.patch("/pinUnpin/:id",pinUnpinChat)




export default router