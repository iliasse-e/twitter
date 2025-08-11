const jwt = require('jsonwebtoken');
const { findUserById } = require('../queries/users.queries');
const { app } = require('../app');

const secret = 'a2463421-b798-470a-b4ee-fd23783ec69d'; // On peut renseigner ça dans une var d'env

const createJwtToken = (user) => {
  const jwtToken = jwt.sign({
    sub: user._id.toString(),
  },
  secret,
  {
    expiresIn: '1h'
  });
  return jwtToken;
}

const extractUserFromToken = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    try {
      const decodedToken = jwt.verify(token, secret);
      const user = await findUserById(decodedToken.sub);
      if (user) {
        req.user = user;
        next();
      } else {
        res.clearCookie('jwt');
      }
    } catch (error) {
      console.error('JWT error:', error.message);
      res.clearCookie('jwt');
      next(); // ou res.status(401).send('Invalid token');
    }
  } else {
    next();
  }
}

const addJwtFeatures = async (req, res, next) => {
  req.isAuthenticated = () => !!req.user;
  req.logout = () => res.clearCookie('jwt');
  req.login = (user) => {
    const token = createJwtToken(user);
    res.cookie('jwt', token, {
      httpOnly: true,       // Empêche l’accès via JavaScript
      secure: true,         // Seulement en HTTPS
      sameSite: 'strict',   // Protection CSRF
      maxAge: 3600000       // 1h en millisecondes
    });
  }
  next();
}

app.use(extractUserFromToken);
app.use(addJwtFeatures);

exports.createJwtToken = createJwtToken;