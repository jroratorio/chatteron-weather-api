var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var findTemp = require('./lib/helper');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/api/gettemp', function(req, res){
    var lat = req.query.lat || '51.5';
    var long = req.query.long || '0.12';
    var unit = req.query.unit || 'C';   
    findTemp(lat, long, unit, res);  
});

app.post('/api/gettemp', function(req, res){
    var lat = req.body.lat || '51.5';
    var long = req.body.long || '0.12';
    var unit = req.body.unit || 'C';   
    findTemp(lat, long, unit, res);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // return error as JSON
  res.status(err.status || 500);
  res.json({ status: err.status, message: 'invalid route'});
});

module.exports = app;
