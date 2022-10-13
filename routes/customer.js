const express = require('express')
const router = express.Router()
const { customerDashboard, customerProfle } = require('../controllers/customerController')

// customer
router.get('/', customerDashboard)
router.get('/customer/me', customerProfle)

module.exports = router