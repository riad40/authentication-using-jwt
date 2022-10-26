const express = require('express')
const router = express.Router()
const { mangerProfle } = require('../controllers/managerController')
const authChecker = require('../middlwares/authCheck')
const managerProtect = require('../middlwares/managerProtect')

// manager
router.get('/me', authChecker, managerProtect, mangerProfle)

module.exports = router