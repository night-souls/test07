var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var session = require("express-session");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var registerRouter = require("./routes/register");
var loginRouter = require("./routes/login");
var blogRouter = require("./routes/blog");
var detailRouter = require("./routes/detail");

var mongoose = require("mongoose"); // Schema name:string age:Number
//-------------连接数据库-----------------------------
mongoose.connect("mongodb://localhost:27017/test1807");

  
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//注册中间件

app.use(session({
    name: "kerwinNodeSessID",//cookie name值
    secret:"kerwindwajlk", //加密钥匙 
    cookie: {maxAge: 1000*3600 }, //1小时
    resave: true, 
    saveUninitialized: true
}));  


//

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/register",registerRouter);
app.use("/login",loginRouter);
app.use("/blog",blogRouter);
app.use("/detail",detailRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
