const router = require('express').Router();
const users = require('./users');
const posts = require('./posts');
const likes = require('./likes');
const favorites = require('./favorites');
const { authController } = require('../controllers');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

router.use('/users', users);
router.use('/posts', posts);
router.use('/likes', likes);
router.use('/favorites', favorites);

module.exports = router;
