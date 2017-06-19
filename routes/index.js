var express = require('express');
var app  = express();
var router = express.Router();
app.io = require('socket.io')();
/* GET home page. */
router.get('/', function(req, res, next) {
  // res.io.emit('chat message', 'Your message');
  res.render('pages/index', { title: 'Socket Chat' });
});

router.post("/", function(req, res, next) {
    res.io.emit('chat message', 'Your message');
    res.send({});
});

module.exports = router;
