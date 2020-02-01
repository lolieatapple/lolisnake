// var http = require('http');
var url = require('url');
var util = require('util');
var fs = require('fs');
// http.createServer(function(req, res){
//     res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
//     res.end(util.inspect(url.parse(req.url, true)));
// }).listen(3000);

// console.log('server start at port 3000');

const express = require('express')
const app = express()

let rank = {};

fs.readFile('rank.json', function (err, data) {
  console.log('read');
  if (err) {
    console.log(err);
    return;
  }
  var person = data.toString();//将二进制的数据转换为字符串
  person = JSON.parse(person);//将字符串转换为json对象
  console.log(person);
  if (person) {
    rank = person;
  }
})

app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Cache-Control", "no-store");//304
  next();
});

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/rank', function (req, res) {
  var params = url.parse(req.url, true).query;
  console.log(params);

  if (params.nick) {
    rank[params.nick] = params;

    var str = JSON.stringify(rank);//因为nodejs的写入文件只认识字符串或者二进制数，所以把json对象转换成字符串重新写入json文件中
    fs.writeFile('rank.json', str, function (err) {
      if (err) {
        console.error(err);
      }
    });
    console.log('set success');
    res.send('set success');
  } else {
    console.log(rank);
    res.send(rank);
  }
})



app.listen(3000)
console.log('server start at port 3000');
