var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')

var indexRouter = require('./routes/index');
var gamesRouter = require('./routes/games');
var statsRouter = require('./routes/stats');

var app = express();
var cors = require('cors');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use('/', indexRouter);
app.use('/games', gamesRouter);
app.use('/stats', statsRouter);

module.exports = app;
