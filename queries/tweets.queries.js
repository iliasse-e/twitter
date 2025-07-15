const Tweet = require('../database/models/tweet.model');

exports.createTweet = (tweet) => {
  const newTweet = new Tweet(tweet);
  return newTweet.save();
}

exports.getTweets = () => {
    return Tweet.find({});
}

exports.getTweet = (id) => {
    return Tweet.findById(id);
}

exports.deleteTweet = (id) => {
    return Tweet.findByIdAndDelete(id);
}

exports.updateTweet = (id, tweet) => {
    return Tweet.findByIdAndUpdate(id, {$set: tweet});
}