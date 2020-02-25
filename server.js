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
  console.log('production');
  app.use(express.static('client/build'));
}

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

app.listen(PORT, () => console.log(`app listening on port ${PORT}`));

//todo

//check throw vs return

//encrypt passwords before sending

//lightly randomize met function

//differentiate between saved and written poems

//screen responsiveness

// Future

// Different Theme Each Day
//proxy errors, data leaks, general running flow
// feedback for saving a poem, markers if poem already saved

//firing axios headers set each time
//proxy errors
//error/success handling
//make delete remove poem everywhere
//reload
//css

//hosting
// mobile responsive
// fix css
// new lines in text areas
// logout glitch

// "test": "echo \"Error: no test specified\" && exit 1",
// "start": "node server.js",
// "server": "nodemon server",
// "client": "npm start --prefix client",
// "dev": "concurrently \"npm run server\" \"npm run client\""
