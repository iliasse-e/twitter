const User = require('../database/models/user.model');

exports.createUser = async (user) => {
  try {
    const hashedPassword = await User.hashPassword(user.password);
    const newUser = new User({
      username: user.username,
      local: {
        email: user.email,
        password: hashedPassword,
      },
    });
    return newUser.save();
  } catch (e) {
    throw e;
  }
};

exports.findUserByEmail = (email) => {
  return User.findOne({ 'local.email': email });
};

exports.findUserById = (id) => {
  return User.findById(id);
};

exports.findUserByUsername = (username) => {
  return User.findOne({ username });
};

exports.searchUsersByUsername = (search) => {
  const regExp = `^${search}`;
  const reg = new RegExp(regExp);
  return User.find({ username: { $regex: reg, $options: 'i' } }).limit(10);
};

exports.addUserIdToCurrentUserFollowing = (currentUser, userId) => {
  currentUser.following = [...currentUser.following, userId];
  return currentUser.save();
};

exports.removeUserIdToCurrentUserFollowing = (currentUser, userId) => {
  currentUser.following = currentUser.following.filter(
    (objId) => objId.toString() !== userId
  );
  return currentUser.save();
};