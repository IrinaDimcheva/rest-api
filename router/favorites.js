const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { productController } = require('../controllers');

// middleware that is specific to this router

// router.get('/', auth(), productController.getFavorites);
// router.post('/add/:productId', auth(), productController.addToFavorites);
// router.delete('/remove/:productId', auth(), productController.removeFromFavorites);



module.exports = router;
