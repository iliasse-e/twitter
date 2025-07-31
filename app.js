const express = require('express');
const morgan = require('morgan');
const path = require('path');
const index = require('./api');
const cors = require('cors')
const { swaggerUi, specs } = require('./documentation/swagger');
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
app.use(cors({credentials: true, origin: 'http://localhost:4200', methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'}));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Define routes
app.use(index)

app.listen(port)