const User = require('../database/models/user.model');

exports.createUser = async (user) => {
    try {
        const hashedPassword = await User.hashPassword(user.password);

        const newUser = new User({
          username: user.username,
          local: {
              email: user.email,
              password: user.password
          }
        });

        return newUser.save();
        
    } catch (error) {
        throw error;
    }
}

exports.findUserByEmail = (email) => {
  return User.findOne({ 'local.email': email });
}

exports.findUserById = (id) => {
  return User.findById(id);
}