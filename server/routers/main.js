import express from 'express'
const router = express.Router()
import userRouter from './user.js'

import authMiddleware from '../middlewares/Authoriztion.js'
router.use(authMiddleware)


router.use('/user', userRouter)





export default  router
