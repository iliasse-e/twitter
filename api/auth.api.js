const router = require('express').Router();
const { signin, signout, signup } = require('../controllers/auth.controller');

router.post('/signin', signin);
router.post('/signout', signout);
router.post('/signup', signup);

module.exports = router;