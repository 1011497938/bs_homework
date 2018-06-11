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
var  sql = 'SELECT * FROM vocabulary WHERE list = ? LIMIT 10';
/* GET users listing. */
router.get('/', function(req, res, next) {
	var listName = req.query.listName
	// var limit = parseInt(req.query.limit)
	// res.send(listName)
    connection.query(sql, listName,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }

        // var data = {}
        // for (var i = 0; i < result.length; i++) {
        // 	let row = result[i]
        // 	data[row['word']] = {
        // 		word: row['word'],
        // 		phonetic: row['phonetic:'],
        // 		meaning: row['meaning']
        // 	}
        // }
        // console.log(data)
        // res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});//设置response编码为utf-8
        // res.send(JSON.stringify(result));
        // res.writeHead(200,{'Content-Type':'application/json;charset=utf-8'});
        res.json(result)
    });
});

module.exports = router;