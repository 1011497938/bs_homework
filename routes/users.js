var express = require('express');
var router = express.Router();
var mysql = require('mysql');

/* GET users listing. */
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'bs_word_list'
});

//执行创建连接 
connection.connect();

// var  sql = 'SELECT * FROM vocabulary WHERE list = ? LIMIT ?';
var  sql = 'SELECT * FROM user WHERE name = ?';


router.get('/', function(req, res, next) {
  var name = req.query.name
  var password = req.query.password
  connection.query(sql, name,function (err, result) {
      if(err){
        console.log('[SELECT ERROR] - ',err.message);
        return;
      }
      if (result.length==0) 
        res.json({
            name: name,
            login: "fail"
        });
      else if (result[0].password==password) 
        res.json({
            name: name,
            login: "success",
            data: JSON.stringify(result[0])
        });
      else
        res.json({
            name: name,
            login: "fail"
        });
  });
});

module.exports = router;