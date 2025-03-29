const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 8000;

var sessions = [];
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/hello', (req, res) => {
  res.send('Hello World!');
});

app.post('/newGame', (req, res) => {
  sessions.push(req.body.thing);
  res.send('Yup');
});

app.get('/list', (req, res) => {
  res.json(sessions);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
