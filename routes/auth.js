const express = require('express')
const { token } = require('morgan')
const router = express.Router()
const { login, register, forgetPassword, resetPassword, verifyEmail, idk } = require('../controllers/authController')

router.post('/login', login)
router.post('/register', register)
router.get('/register/verify/:token', verifyEmail)
router.post('/forgetpassword', forgetPassword)
router.post('/resetpassword', resetPassword)
router.get('/resetpassword', idk)

module.exports = router