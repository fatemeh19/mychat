const express = require('express')
const router = express.Router()

// register, login, forgetpassword,resetpassword, verifyemail, logout
const {register,verifyEmail} = require('../controllers/authController')

router.post('/register', register)
router.post('/verifyEmail',verifyEmail )


module.exports = router
