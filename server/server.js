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
const CROSSWORDS_PATH = './api/crosswords/';

app.get('/api/crosswords', (req, res) => {
  fs.readdir(CROSSWORDS_PATH, (err, files) => {
    const crosswords = files.map((file) => {
      const [id, fileName] = file.split('-');
      let [name] = fileName.split('.');
      name = name.replace('_', ' ');
      return { name, id };
    });
    res.json({ crosswords });
  });
});

app.get('/api/crosswords/:id', (req, res) => {
  fs.readdir(CROSSWORDS_PATH, (err, files) => {
    const fileName = files.find(file => file.startsWith(`${req.params.id}-`));
    fs.readFile(`${CROSSWORDS_PATH}${fileName}`, { encoding: 'utf-8' }, (error, data) => {
      res.json(JSON.parse(data));
    });
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`)); // eslint-disable-line no-console
