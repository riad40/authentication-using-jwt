const express = require('express')
const router = express.Router()
const { customerProfle } = require('../controllers/customerController')
const authChecker = require('../middlwares/authCheck')
const customerProtect = require('../middlwares/customerProtect')

// customer
router.get('/me', authChecker, customerProtect, customerProfle)

module.exports = router