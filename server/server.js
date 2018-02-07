const express = require('express');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 5000;

app.get('/api/crossword', (req, res) => {
  fs.readFile('./api/crossword-data.json', { encoding: 'utf-8' }, (err, data) => {
    res.json(JSON.parse(data));
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`)); // eslint-disable-line no-console
