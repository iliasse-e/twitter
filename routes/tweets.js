const router = require('express').Router();
const { tweetList, tweetNew, tweetCreate, tweetDelete } = require('../controllers/tweets.controller');

router.get('/', tweetList);
router.post('/', tweetCreate);
router.get('/new', tweetNew);
router.delete('/:tweetId', tweetDelete);

module.exports = router;