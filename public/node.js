const express = require('express');
const mysql = require('mysql');
var path = require('path');
var app = express();

app.use(express.static(path.join(__dirname, './node')));

app.get('/', function(req, res) {
   res.sendfile('index.html');
});

var db= mysql.createConnection({
    host: "localhost",
    user: "charles",
    password: "password",
    database: "twitterDB"
});
db.connect((err) => {
    console.log('MySql Connected...');
});

app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE twitterDB';
    db.query(sql, (err, result) => {
        console.log(result);
        res.send('Database created...');
    });
});

app.get('/createpoststable', (req, res) => {
    let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, text VARCHAR(255), like VARCHAR(5) , PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        //if(err) throw err;
        console.log(result);
        res.send('Posts table created...');
    });
});
app.get('/first', (req, res) =>{
    var first = {id: 1, text: "hello world", like:"false"};
    var second = {id: 2, text: "hello world 2", like:"false"};
    var third = {id: 3, text: "hello world 3", like:"false"};
    var forth = {id: 4, text: "hello world 4", like:"false"};
    res.send([first,second,third,forth]);
})
app.get('/addpost1', (req, res) => {
    let post = {id:'1', text:'This is post number one',like:"false"};
    let sql = 'INSERT INTO posts SET ?';
    let query = db.query(sql, post, (err, result) => {
        //if(err) throw err;
        console.log(result);
        res.send('Post 1 added...');
    });
});


app.get('/updatepost/:id', (req, res) => {
    let newTitle = 'Updated Title';
    let sql = `UPDATE posts SET like = '${newlike}' WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        //if(err) throw err;
        console.log(result);
        res.send('Post updated...');
    });
});


app.listen('3000',() =>{
    console.log('Server started on port 3000');
})

