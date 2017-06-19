var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bcrypt = require('bcrypt');
var db = require('../config/db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/register');
});

router.post('/',function (req,res) {
db.getConnection(function(err, connection){
       if (!err) {
         var uname = req.body.username;
         var uemail = req.body.email;
         var name = req.body.name;
         var upass = req.body.password;
         var ucpass = req.body.confirmpassword;
         var hashp = bcrypt.hashSync(upass, 10);
         if (upass === ucpass) {
           query = "INSERT INTO `login`.`user` (`uname`, `upass`, `name`,`email`) VALUES ('"+uname+"', '"+hashp+"', '"+name+"', '"+uemail+"')";
           connection.query(query , function(err, rows) {
             res.render('pages/register');
             console.log("Successfull");
             res.end();
           })
         } else {
           console.log('Error while performing Query.');
           console.log(err);
         }
         } else {
           console.log('Passwords are not same');
         }

});
});

module.exports = router;
