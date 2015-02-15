var nunjucks  = require('nunjucks');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var home = require('./routes/index');
var admin = require('./routes/admin');

var app = express();

// configuration of Nunjucks
nunjucks.configure('views', {
  autoescape: true,
  express   : app
});

// configuration of Mongoose
var optionsMongoose = {user: 'admin', pass: 'admin'};
mongoose.connect('mongodb://<dbuser>:<dbpassword>@ds053698.mongolab.com:53698/shorty', optionsMongoose);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  // yay!
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'nunjucks');


app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));

app.use('/', home);
app.use('/admin', admin);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});




// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
