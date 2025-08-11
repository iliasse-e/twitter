const cookieParser = require('cookie-parser');
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

// Apply middleware
app.use(cookieParser());
app.use(morgan('short'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({credentials: true, origin: 'http://localhost:4200', methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'}));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

require('./config/jwt.config');

// Define routes
app.use(index)

app.listen(port)