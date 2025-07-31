exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  }
  else {
    res.status(401).json({ message: 'Unauthorized' });
  }
  
}


exports.isTweetAuthor = async (req, res, next) => {
  try {
     const tweetId = req.params.tweetId;
     const tweet = await getTweet(tweetId);

     if (!tweet) {
      return res.status(404).json({error: 'Tweet not found'});
     }
     if (tweet.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({error: 'Forbidden: not the author' });
     }
      req.tweet = tweet; // Attach tweet to request for further use
      next();
   } catch (error) {
    next(error);
   }
};