const router = require('express').Router();
const multer = require('multer');
const { storage } = require('../utils');
const users = require('./users');
const posts = require('./posts');
const comments = require('./comments');
const likes = require('./likes');
const favorites = require('./favorites');
const { authController } = require('../controllers');

router.post('/register', multer(storage).single('image'), authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

router.use('/users', users);
router.use('/posts', posts);
router.use('/likes', likes);
router.use('/favorites', favorites);

module.exports = router;
