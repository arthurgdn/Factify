const express = require('express')
const auth = require('../middleware/auth')
const feedController = require('../controllers/feed')
const router = new express.Router()

router.get('/feed/main',auth,feedController.mainFeed)
router.get('/feed/popular',auth,feedController.popularFeed)

module.exports = router