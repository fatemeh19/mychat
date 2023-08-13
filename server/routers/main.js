import express from 'express'
const router = express.Router()
import userRouter from './user.js'
import chatRouter from './chat.js'
import contactRouter from "./contact.js";
import messageRouter from './message.js';
import devRouter from './dev.js'
import folderRouter from './folder.js'
import settingRouter from './setting.js'
import authMiddleware from '../middlewares/Authoriztion.js'
router.use('/dev',devRouter)

router.use(authMiddleware)

router.use('/chat',chatRouter)
router.use('/user', userRouter)
router.use("/contact", contactRouter);
router.use('/message',messageRouter)
router.use('/folder', folderRouter)
router.use('/setting',settingRouter)






export default  router
