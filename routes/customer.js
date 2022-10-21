const express = require('express')
const router = express.Router()
const { customerProfle } = require('../controllers/customerController')
const authChecker = require('../middlwares/authCheck')

// customer
router.get('/me', authChecker, customerProfle)

module.exports = router