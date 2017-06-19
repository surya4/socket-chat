var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var login = require('./routes/login');
var register = require('./routes/register');

var app = express();
app.io = require('socket.io')();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/login', login);
app.use('/register', register);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Page Not Found');
  err.status = 404;
  next(err);
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


var sapiens = {};

// start listen with socket.io
app.io.on('connection', function(socket){
  socket.broadcast.on('join', function(name){
     sapiens[socket.id] = name;
    console.log('New Person joined: ' + name);
    // app.io.emit('chat message', name);
    socket.emit("update", "You're' connected to the chat");
    app.io.emit("update", name + " has joined the chat.")
    app.io.emit("update-people", sapiens);
  });

  socket.on("send", function(msg){
    console.log(sapiens[socket.id]+' says: ' + msg);
        app.io.emit("chat", sapiens[socket.id], msg);
    });


  socket.on('disconnect', function(){
    app.io.emit("update", sapiens[socket.id] + " has left the chat.");
        delete sapiens[socket.id];
        app.io.emit("update-people", sapiens);
        console.log('One user disconnected');
  });
});

app.use(function(req, res, next) {
res.io = app.io;
next();
});

module.exports = app;
