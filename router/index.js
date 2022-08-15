const router = require('express').Router();
const user = require('./user');
const products = require('./products');
const likes = require('./likes');
const favorites = require('./favorites');
const auth = require('./auth');
// const cart = require('./cart');

router.use('/auth', auth);
router.use('/user', user);
router.use('/products', products);
// router.use('/cart', cart);
router.use('/likes', likes);
router.use('/favorites', favorites);

module.exports = router;
