const express = require('express')
const router = express.Router()
const { login, register, forgetPassword, resetPassword } = require('../controllers/authController')

router.post('/login', login)
router.post('/register', register)
router.post('/forgetpassword', forgetPassword)
router.post('/resetpassword', resetPassword)

module.exports = router