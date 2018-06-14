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



router.get('/', function(req, res, next) {
  var  sql = 'SELECT * FROM user WHERE name = ?';
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

// http://localhost:3001/users/signUp?name="hi"&email="hi@com"&password="123456"
router.get('/signUp', function(req, res, next) {
  var  sql = 'SELECT * FROM user WHERE name = ?';
  var name = req.query.name
  var password = req.query.password
  var email = req.query.email

  
  connection.query(sql, name,function (err, result){
    sql = 'INSERT INTO user(name, email, password,selectedVocabulary, completion, days) VALUES (?,?,?,"none",0,0)'
    if (result.length!=0)
      res.send("exist")
    else connection.query(sql, [name,email, password],function (err, result) {
      if(err){
        console.log('[SELECT ERROR] - ',err.message);
          res.send("fail")
        return;
      }
      res.send("success")
    });
  });
});

module.exports = router;