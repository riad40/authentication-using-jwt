const express = require('express')
const router = express.Router()
const { deliveryDashboard, deliveryProfle } = require('../controllers/deliveryController')

// delivery man
router.get('/', deliveryDashboard)
router.get('/delivery/me', deliveryProfle)

module.exports = router