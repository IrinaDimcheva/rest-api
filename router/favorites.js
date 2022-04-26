const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { postController } = require('../controllers');

// middleware that is specific to this router

router.get('/', auth(), postController.getFavorites);
router.post('/add/:postId', auth(), postController.addToFavorites);
router.delete('/remove/:postId', auth(), postController.removeFromFavorites);

module.exports = router;