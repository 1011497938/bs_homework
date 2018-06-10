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

var  sql = 'SELECT * FROM vocabulary';
/* GET home page. */
router.get('/', function(req, res, next) {
    connection.query(sql,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        //把搜索值输出
       res.send(result);
    });
});




module.exports = router;
