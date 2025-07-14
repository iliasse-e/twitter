const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('tweets/tweet-list');
});

router.get('/tweet/new', (req, res) => {
  res.render('tweets/tweet-form');
});

module.exports = router;