const express = require('express')
const auth = require('../middleware/auth')
const postController = require('../controllers/post')
const router = new express.Router()

router.post('/posts',auth,postController.newPost)
router.post('/posts/:id/upvote',auth,postController.upvote)
router.post('/posts/:id/downvote',auth,postController.downvote)

module.exports = router