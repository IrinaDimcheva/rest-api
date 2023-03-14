const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { postController, commentController } = require('../controllers');

// middleware that is specific to this router

router.get('/', postController.getPosts);
router.post('/', auth(), postController.createPost);

router.get('/:postId', postController.getPost);
router.delete('/:postId', auth(), postController.deletePost);
router.put('/:postId', auth(), postController.updatePost);
router.post('/:postId/comments', auth(), commentController.createComment);
router.get('/:postId/comments', commentController.getComments);
router.get('/:postId/comments/:commentId', auth(), commentController.getComment);
router.get('/:postId', auth(), commentController.getLatestsComments);
router.put('/:postId/comments/:commentId', auth(), commentController.editComment);
router.delete('/:postId/comments/:commentId', auth(), commentController.deleteComment);

module.exports = router;
