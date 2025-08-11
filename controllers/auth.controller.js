const { findUserByEmail, createUser } = require("../queries/users.queries");

exports.signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    const match = await user.comparePassword(password);

    if (!match) {
      return res.status(401).json({ message: 'Wrong user or password' });
    }

    req.login(user); // Utilise ton propre middleware
    res.json({ message: 'User connected', user });
    
  } catch (error) {
    next(e);
  }
}

exports.signup = async (req, res, next) => {
  const body = req.body;
  try {
    const user = await createUser(body);
    res.json(user);
  } catch(e) {
    res.status(400).json({ errors: [ e.message ] });
  }
}

exports.signout = (req, res, next) => {
  req.logout();
  res.json({ message: 'Signed out' });
}