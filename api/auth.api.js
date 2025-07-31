const router = require('express').Router();
const { signin, signout } = require('../controllers/auth.controller');

router.post('/signin', signin);
router.get('/signout', signout);

module.exports = router;