const express = require('express')
const router = express.Router()
const { deliveryProfle } = require('../controllers/deliveryController')
const authChecker = require('../middlwares/authCheck')

// delivery man
router.get('/me', authChecker, deliveryProfle)

module.exports = router