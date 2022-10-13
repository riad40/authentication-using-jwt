const express = require('express')
const router = express.Router()
const { managerDashboard, mangerProfle } = require('../controllers/managerController')

// manager
router.get('/', managerDashboard)
router.get('/manager/me', mangerProfle)

module.exports = router