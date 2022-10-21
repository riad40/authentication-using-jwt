const express = require('express')
const router = express.Router()
const { mangerProfle } = require('../controllers/managerController')
const authChecker = require('../middlwares/authCheck')

// manager
router.get('/me', authChecker, mangerProfle)

module.exports = router