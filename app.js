var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//for auth tut
const session = require('express-session');
const bcrypt = require('bcrypt');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//auth
app.use(session({
    secret: "top secret!",
    resave: true,
    saveUninitialized:true
}));

////////////////////////////////////////////////////////////
// ROUTING
////////////////////////////////////////////////////////////

var lab9Router = require('./public/09lab/routertut');
var lab10Router = require('./public/10Lab/router');

//Final Router
var finalRouter = require('./public/Final/router');
//var finalAddTime = require('./public/Final/addTime');


//auth tut
// var authExerRouter = require('./public/Exercises/authentication/router');

app.use('/', indexRouter);
app.use('/users', usersRouter);


//Labs
app.use('/lab/9', lab9Router);
app.use('/lab/10', lab10Router);

/////////
//Final//
/////////

app.use('/final', finalRouter);
//app.use('/addTime', finalRouter);


//auth tut
// //app.use('/', authExerRouter);
// app.use(session({
//   secret: "top secret!",
//   resave: true,
//   saveUninitialized: true
// }));

// app.get('/auth', authExerRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// starting server
app.listen(process.env.PORT || 3000, process.env.IP, function () {
    console.log("Express server is running...");
});

module.exports = app;
