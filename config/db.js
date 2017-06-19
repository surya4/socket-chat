var mysql = require('mysql');

var pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'computer',
  database: 'chatapp'
});

exports.getConnection = function(callback) {
    pool.getConnection(function(err, connection) {
        callback(err, connection);
    });
};
