const { createTweet, deleteTweet, getTweet, updateTweet, getCurrentUserTweetsWithFollowing } = require('../queries/tweets.queries');

exports.tweetList = async (req, res, next) => {
  try {
    const tweets = await getCurrentUserTweetsWithFollowing(req.user);
    res.json(tweets);
  } catch(e) {
    next(e);
  }
}

exports.tweetCreate = async (req, res, next) => {
  try {
    const body = req.body;
    const tweet = await createTweet({...body, author: req.user._id });
    res.status(201).json(tweet);
  } catch(e) {
    const errors = Object.keys(e.errors).map( key => e.errors[key].message );
    res.status(400).json({ errors });
  }
}

exports.tweetDelete = async (req, res, next) => {
  try {
    const tweetId = req.params.tweetId;
    const deletedTweet = await deleteTweet(tweetId);
    res.status(203).json({ message: 'Tweet deleted successfully', tweet: deletedTweet });
  } catch(e) {
    next(e);
  }
}

exports.getTweet = async (req, res, next) => {
  try {
    const tweetId = req.params.tweetId;
    const tweet = await getTweet(tweetId);
    if (!tweet) {
      return res.status(404).json({ error: 'Tweet not found' });
    }
    res.json(tweet);
  } catch(e) {
    next(e);
  }
}

exports.tweetUpdate = async (req, res, next) => {
  try {
    const tweetId = req.params.tweetId;
    const body = req.body;
    const updatedTweet = await updateTweet(tweetId, body);
    res.json(updatedTweet);
  } catch(e) {
    const errors = Object.keys(e.errors).map( key => e.errors[key].message );
    res.status(400).json({ errors });
  }
}