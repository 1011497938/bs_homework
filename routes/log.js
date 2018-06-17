var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'bs_word_list'
});

//执行创建连接 
connection.connect();

// http://localhost:3001/log?user=1
router.get('/', function(req, res, next) {
    var users = req.query.user
    var  sql = 'SELECT * FROM history WHERE users = ? ORDER BY date DESC LIMIT 5';
    var listName = req.query.listName
    connection.query(sql, users,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        res.json(result)
    });
});


// http://localhost:3001/log/add?user=1&date=2018-6-12&num=200
router.get('/add', function(req, res, next) {
	var users = req.query.user
    var date = req.query.date
    var num = req.query.num
	var  sql = "INSERT INTO history (users, date, num) VALUES (?, ?, ?)"
    connection.query(sql, [users, date, num],function (err, result) {
      if(err){
        console.log('[SELECT ERROR] - ',err.message);
        return;
      }
      res.send("success")
  });
});

module.exports = router;