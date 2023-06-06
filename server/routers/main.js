const express = require('express')
const router = express.Router()
const userRouter = require('./user')

const authMiddleware = require('../middlewares/Authoriztion')
router.use(authMiddleware)


router.use('/user', userRouter)




module.exports = router
