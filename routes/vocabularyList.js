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
var  sql = 'SELECT DISTINCT list FROM vocabulary WHERE owner = ?';
/* GET users listing. */
router.get('/', function(req, res, next) {
	var owner = req.query.owner
  console.log(owner)
  connection.query(sql, owner,function (err, result) {
      if(err){
        console.log('[SELECT ERROR] - ',err.message);
        return;
      }
      res.json(result)
  });
  // res.send("hello")
});

module.exports = router;