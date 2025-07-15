const { getTweets, createTweet, deleteTweet, getTweet, updateTweet } = require("../queries/tweets.queries");

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

exports.tweetEdit = async (req, res, next) => {
    try {
        const id = req.params.tweetId;
        const tweet = await getTweet(id);
        res.render('tweets/tweet-form', { tweet });
    } catch (error) {
        next(error);
    }
}

exports.tweetUpdate = async (req, res, next) => {
    const id = req.params.tweetId;
    try {
        const body = req.body;
        await updateTweet(id, body);
        res.redirect('/tweets');
    } catch (error) {
        const errors = Object.keys(e.errors).map( key => e.errors[key].message );
        const tweet = await getTweet(id);
        res.status(400).render('tweets/tweet-form', { errors, tweet });
    }
}