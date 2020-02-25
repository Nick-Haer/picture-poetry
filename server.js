require('dotenv').config();

const express = require('express');

const dbConnection = require('./dbConnection');

const app = express();

const mongoose = require('mongoose');

const routes = require('./controllers');

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, './client/public/index.html'), function(
    err
  ) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

dbConnection();

app.use(routes);

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
