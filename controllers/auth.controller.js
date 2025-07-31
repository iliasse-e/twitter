const passport = require('passport');

exports.signin = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    } else if (!user) {
      return res.status(401).json({ errors: [info.message] });
    } else {
      req.login(user, (err) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        } else {
          return res.json({ message: 'Authenticated', user });
        }
      });
    }
  })(req, res, next);
}

exports.signout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Signed out' });
  });
}