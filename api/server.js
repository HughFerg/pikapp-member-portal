const express = require('express');
const path = require('path');
const app = express(),
      bodyParser = require("body-parser");
      port = 3080;

// cache user data in memory
const users = [];
app.use(express.static(path.join(__dirname, '../my-app/out')));


app.get('/api/users', (req, res) => {
  console.log('api/users called!')

  // TODO: call DAO object here if cache empty

  res.json(users);
});

app.post('/api/user', (req, res) => {
  const user = req.body.user;
  console.log('Adding user:::::', user);
  users.push(user);

  // TODO: put obj to database

  res.json("user addedd");
});

app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, '../my-app/out/index.html'));
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});