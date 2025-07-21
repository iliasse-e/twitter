const router = require('express').Router();
const { signup, signupForm, uploadImage } = require('../controllers/users.controller');

router.get('/signup/form', signupForm);
router.post('/signup', signup);
router.post('/update/image', uploadImage);

module.exports = router;