const router = require('express').Router();
const { tweetList, tweetCreate, tweetDelete, getTweet, tweetUpdate } = require('../controllers/tweets.controller');
const { isTweetAuthor } = require('../middlewares/auth.middleware');

router.get('/', tweetList);
router.post('/', tweetCreate);
router.get('/:tweetId', getTweet);
router.put('/:tweetId', isTweetAuthor, tweetUpdate);
router.delete('/:tweetId', isTweetAuthor, tweetDelete);

module.exports = router;