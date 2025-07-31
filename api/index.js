const router = require('express').Router();
const tweets = require('./tweets.api');
const users = require('./user.api');
const auth = require('./auth.api');
const { isAuthenticated } = require('../middlewares/auth.middleware');

router.use('/tweets', isAuthenticated, tweets);
router.use('/users', isAuthenticated, users);
router.use('/auth', auth);

module.exports = router;