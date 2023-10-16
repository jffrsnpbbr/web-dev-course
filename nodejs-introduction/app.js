const fs = require('fs');
const path = require('path');

const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: false }));

app.get('/currenttime', function(req, res) {
  res.send('<h1>' + new Date().toISOString() + '</h1>');
}); // localhost:3000/currenttime

app.get('/', function(req, res) {
  res.send(
    '<form action="/store-user" method="post"><label>Your Name</label><input type="text" name="username"><button>Submit</button></form>'
  );
}); // localhost:3000

app.post('/store-user', function(req, res) {
  const username = req.body.username;

  const filePath = path.join(__dirname, 'data', 'users.json');
  
  const fileData = fs.readFileSync(filePath);
  const existingUsers = JSON.parse(fileData);
  
  existingUsers.push(username);;

  fs.writeFileSync(filePath, JSON.stringify(existingUsers));

  res.send(
    '<h1>Username stored!</h1>'
  );
}); // localhost:3000

app.listen(3000);
