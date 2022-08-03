const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { productController, commentController } = require('../controllers');

// middleware that is specific to this router

router.get('/', productController.getProducts);
router.get('/:category', productController.getProductsByCategory);
router.post('/new', auth(), productController.createProduct);

router.get('/:productId', productController.getProduct);
router.delete('/:productId', auth(), productController.deleteProduct);
router.put('/:productId', auth(), productController.updateProduct);
router.post('/:productId/comments', auth(), commentController.createComment);
router.get('/:productId/comments', commentController.getComments);
router.get('/:productId/comments/:commentId', auth(), commentController.getComment);
router.get('/:productId', auth(), commentController.getLatestsComments);
router.put('/:productId/comments/:commentId', auth(), commentController.editComment);
router.delete('/:productId/comments/:commentId', auth(), commentController.deleteComment);

module.exports = router;