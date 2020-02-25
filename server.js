require('dotenv').config();

const express = require('express');

const dbConnection = require('./dbConnection');

const app = express();

const path = require('path');

const mongoose = require('mongoose');

const routes = require('./controllers');

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

const PORT = process.env.PORT || 5000;

// app.get('/*', function(req, res) {
//   res.sendFile(path.join(__dirname, './public/index.html'), function(err) {
//     if (err) {
//       res.status(500).send(err);
//     }
//   });
// });

dbConnection();

app.use(routes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

app.listen(PORT, () => console.log(`app listening on port ${PORT}`));
