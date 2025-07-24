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
    return Tweet.findByIdAndUpdate(id, { $set: tweet }, { runValidators: true });
}

exports.getCurrentUserTweetsWithFollowing = (user) => {
  return Tweet.find({ author: { $in: [ ...user.following, user._id] } }).populate('author');
}

exports.getUserTweetsFormAuthorId = (authorId) => {
  return Tweet.find({ author: authorId }).populate('author');
}