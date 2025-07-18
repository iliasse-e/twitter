const router = require('express').Router();
const tweets = require('./tweets');
const users = require('./user.routes');
const auth = require('./auth.routes');

router.use('/tweets', tweets);
router.use('/users', users);
router.use('/auth', auth);

router.get('/', (req, res) => {
  res.redirect('/tweets');
})

module.exports = router;