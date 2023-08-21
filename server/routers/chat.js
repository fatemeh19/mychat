import express from 'express'
const router = express.Router()
import groupRouter from "./group.js"
import uploadFile from "../utils/multer.js"
import {deleteChatI,searchChatI,addToChatsI,pinUnpinChatI,createChatI,getChatI,getChatsI} from '../inters/chat.js'
router.use('/group', groupRouter)
router.route('/').post(uploadFile.single('profilePic'),createChatI).get(getChatsI)
router.route('/:id').get(getChatI)
router.patch("/pinUnpin/:id",pinUnpinChatI)
router.patch("/addToChats/:id",addToChatsI)
router.get('/search/:search',searchChatI)



export default router