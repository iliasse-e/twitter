const express = require('express');
const morgan = require('morgan');
const path = require('path');
const index = require('./routes');
require('./database');

const app = express();
exports.app = app;
const port = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

require('./config/session.config');
require('./config/passport.config');

// Apply middleware
app.use(morgan('short'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Define routes
app.use(index)

app.listen(port)