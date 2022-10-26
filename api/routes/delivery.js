const express = require('express')
const router = express.Router()
const { deliveryProfle } = require('../controllers/deliveryController')
const authChecker = require('../middlwares/authCheck')
const deliveryProtect = require('../middlwares/deliveryProtect')


// delivery man
router.get('/me', authChecker, deliveryProtect, deliveryProfle)

module.exports = router