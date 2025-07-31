const { createUser, findUserByUsername, searchUsersByUsername, removeUserIdToCurrentUserFollowing, addUserIdToCurrentUserFollowing, findUserById } = require('../queries/users.queries');
const path = require('path');
const multer = require('multer');
const { getUserTweetsFormAuthorId } = require('../queries/tweets.queries');
const upload = multer({ storage: multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join( __dirname, '../public/images/avatars'))
  },
  filename: (req, file, cb) => {
    cb(null, `${ Date.now() }-${ file.originalname }`);
  }
}) })

exports.signup = async (req, res, next) => {
  const body = req.body;
  try {
    const user = await createUser(body);
    res.json(user);
  } catch(e) {
    res.status(400).json({ errors: [ e.message ] });
  }
}

exports.uploadImage = [
  upload.single('avatar'),
  async (req, res, next) => {
    try {
      const user = req.user;
      user.avatar = `/images/avatars/${ req.file.filename }`;
      await user.save();
      res.json(user.avatar);
    } catch(e) {
      next(e);
    }
  }
]

exports.userProfile = async (req, res, next) => {
  try {
    const username = req.params.username;
    const user = await findUserByUsername(username);
    const tweets = await getUserTweetsFormAuthorId(user._id);
    res.json({ tweets, user, editable: false });
  } catch(e) {
    next(e);
  }
}

exports.userList = async (req, res, next) => {
  try {
    const search = req.query.search;
    const users = await searchUsersByUsername(search);
    res.json(users);
  } catch(e) {
    next(e);
  }
}

exports.followUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const [, user] = await Promise.all([ addUserIdToCurrentUserFollowing(req.user, userId), findUserById(userId)]);
    res.json({message: `You are now following ${ user.username }` });
  } catch(e) {
    next(e);
  }
}

exports.unFollowUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const [, user] = await Promise.all([ removeUserIdToCurrentUserFollowing(req.user, userId), findUserById(userId)]);
    res.json({message: `You have unfollowed ${ user.username }` });
  } catch(e) {
    next(e);
  }
}