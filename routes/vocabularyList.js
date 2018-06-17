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

// var  sql = 'SELECT * FROM vocabulary WHERE list = ? LIMIT ?';

/* GET users listing. */
router.get('/', function(req, res, next) {
	var owner = req.query.owner
  // console.log(owner)
  var  sql = 'SELECT DISTINCT list FROM user_vocabulary WHERE user = ? OR user = "all"';
  connection.query(sql, owner,function (err, result) {
      if(err){
        console.log('[SELECT ERROR] - ',err.message);
        return;
      }
      res.json(result)
  });
  // res.send("hello")
});

// 单词表个数
router.get('/count', function(req, res, next) {
  var owner = req.query.owner
  // console.log(owner)
  var  sql = 'SELECT DISTINCT count(*) as count FROM user_vocabulary WHERE user = ? OR user = "all" ORDER BY user DESC';
  connection.query(sql, owner,function (err, result) {
      if(err){
        console.log('[SELECT ERROR] - ',err.message);
        return;
      }
      res.json(result[0])
  });
  // res.send("hello")
});

router.get('/add', function(req, res, next) {
  var  sql = "INSERT INTO user_vocabulary (user, list) VALUES (?, ?)"
  var owner = req.query.owner
  var name = req.query.name
  // console.log(owner)
  connection.query(sql, [owner,name],function (err, result) {
      if(err){
        console.log('[SELECT ERROR] - ',err.message);
        return;
      }
      res.send("success")
  });
  // res.send("hello")
});

router.get('/delete', function(req, res, next) {
  var  sql = "DELETE FROM user_vocabulary WHERE user = ? AND list = ?"
  var owner = req.query.owner
  var name = req.query.name
  // console.log(owner)
  connection.query(sql, [owner,name],function (err, result) {
      if(err){
        console.log('[SELECT ERROR] - ',err.message);
        return;
      }
      res.send("success")
  });
  // res.send("hello")
});


module.exports = router;