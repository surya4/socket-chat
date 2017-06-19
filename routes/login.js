var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bcrypt = require('bcrypt');
var db = require('../config/db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/login');
});

// for testing username = abra, password = 1;

router.post('/', function(req, res) {
  db.getConnection(function(err, connection) {
    if (!err) {
      var username = req.body.username;
      var pass = req.body.password;
      query = "select upass,name,email from users where uname = '" + username + "';";
      connection.query(query, function(err, rows) {
        var passw = req.body.password;
        if (bcrypt.compareSync(pass, bcrypt.hashSync(passw, 10))) {
          var passu = JSON.stringify(req.body.name);
          var passn = JSON.stringify(req.body.email);
          console.log('Successfull');
        } else {
          console.log('Not correct user');
        }
        res.render('pages/login');
        res.end();
      })
    } else {
      console.log('Error while performing Query.');
      console.log(err);
    }
  });
});

module.exports = router;
