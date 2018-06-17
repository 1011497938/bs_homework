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
    var  sql = 'SELECT * FROM vocabulary WHERE list = ? LIMIT 10';
	var listName = req.query.listName
    connection.query(sql, listName,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        res.json(result)
    });
});

// http://localhost:3001/vocabulary/wordNum?owner=all&name=%E5%9B%9B%E7%BA%A7
router.get('/wordNum', function(req, res, next) {
  var  sql = 'SELECT count(*) AS count FROM vocabulary WHERE list = ? AND (owner = ? or owner = "all")';
  var owner = req.query.owner
  var name = req.query.name

  connection.query(sql, [name,owner],function (err, result) {
      if(err){
        console.log('[SELECT ERROR] - ',err.message);
        return;
      }
      res.send(result[0])
  });
});


module.exports = router;