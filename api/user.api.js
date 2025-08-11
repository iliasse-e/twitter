const router = require('express').Router();
const { uploadImage, userProfile, userList, followUser, unFollowUser } = require('../controllers/users.controller');

router.get('/', userList);
router.get('/follow/:userId', followUser);
router.get('/unfollow/:userId', unFollowUser);
router.get('/:username', userProfile);
router.post('/update/image', uploadImage);

module.exports = router;