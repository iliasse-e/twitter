const { getTweets, createTweet, deleteTweet } = require("../queries/tweets.queries");

exports.tweetCreate = async (req, res, next) => {
    try {
        const body = req.body;
        await createTweet(body);
        res.redirect('/');
    } catch (error) {
        const errors = Object.keys(e.errors).map( key => e.errors[key].message );
        res.status(400).render('tweets/tweet-form', { errors });
    }
}

exports.tweetList = async (req, res, next) => {
  try {
    const tweets = await getTweets();
    res.render('tweets/tweet', { tweets });
  } catch(e) {
    next(e);
  }
}

exports.tweetNew = (req, res, next) => {
  res.render('tweets/tweet-form', { tweet: {} });
}

exports.tweetDelete = async (req, res, next) => {
    try {
        const id = req.params.tweetId;
        await deleteTweet(id);
        const tweets = await getTweets();
        res.render('tweets/tweet-list', { tweets });
    } catch (error) {
        next(error);
    }
}