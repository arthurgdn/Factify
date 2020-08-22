const express = require('express')
const auth = require('../middleware/auth')
const postController = require('../controllers/post')
const router = new express.Router()

router.post('/posts',auth,postController.newPost)
module.exports = router