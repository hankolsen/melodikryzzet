const express = require('express');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 5000;
app.all('*', (req, res, next) => {
  const origin = req.get('origin');
  res.header('Access-Control-Allow-Origin', origin);
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/api/crossword', (req, res) => {
  fs.readFile('./api/crossword-data.json', { encoding: 'utf-8' }, (err, data) => {
    res.json(JSON.parse(data));
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`)); // eslint-disable-line no-console
