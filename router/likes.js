const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
// const { postController } = require('../controllers');
const { commentController } = require('../controllers');

// middleware that is specific to this router

// router.put('/:postId', auth(), postController.like);
// router.put('/:commentId', auth(), commentController.like);

module.exports = router
