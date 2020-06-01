"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const middlewares = require('./middlewares');

const auth = require('./routes/auth');
const product = require('./routes/product');

const api = express();

api.use(helmet());
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: false }));
api.use(middlewares.allowCrossDomain);

api.get('/', (req, res) => {
	res.json({
		name: 'Holzkorb'
	});
});

api.use('/auth', auth);
api.use('/products', product);

// error handler
api.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = api;