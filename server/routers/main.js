import express from 'express'
const router = express.Router()
import userRouter from './user.js'
import chatRouter from './chat.js'
import contactRouter from "./contact.js";
import messageRouter from './message.js';

import authMiddleware from '../middlewares/Authoriztion.js'
router.use(authMiddleware)

router.use('/chat',chatRouter)
router.use('/user', userRouter)
router.use("/contact", contactRouter);
router.use('/message',messageRouter)





export default  router
