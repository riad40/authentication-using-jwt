const express = require('express')
const router = express.Router()
const { login, register, forgetPassword, resetPassword, idk } = require('../controllers/authController')

router.post('/login', login)
router.post('/register', register)
router.post('/forgetpassword', forgetPassword)
router.post('/resetpassword', resetPassword)
router.get('/resetpassword', idk)

module.exports = router