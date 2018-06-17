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
    var  sql = 'SELECT * FROM vocabulary WHERE list = ? LIMIT 100';
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

// http://localhost:3001/vocabulary/addTo?word=helloWorld&meaning=啥呀&vocabulary=test1&owner=1
router.get('/addTo', function(req, res, next) {
  var sql = 'INSERT INTO vocabulary(word, meaning, list, owner) VALUES (?,?,?,?)';
  var owner = req.query.owner
  var word = req.query.word
  var vocabulary = req.query.vocabulary
  var meaning = req.query.meaning
  connection.query(sql, [word, meaning, vocabulary, owner],function (err, result) {
      if(err){
        console.log('[SELECT ERROR] - ',err.message);
        return;
      }
      res.send("success")
  });
});

// http://localhost:3001/vocabulary/delete?word=helloWorld&vocabulary=test1&owner=1
router.get('/delete', function(req, res, next) {
  var sql = 'DELETE FROM vocabulary WHERE word = ? AND list = ? AND owner = ?';
  var owner = req.query.owner
  var word = req.query.word
  var vocabulary = req.query.vocabulary
  connection.query(sql, [word, vocabulary, owner],function (err, result) {
      if(err){
        console.log('[SELECT ERROR] - ',err.message);
        return;
      }
      res.send("success")
  });
});
module.exports = router;