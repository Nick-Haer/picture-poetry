require('dotenv').config();

const express = require('express');

const dbConnection = require('./dbConnection');

const app = express();

const mongoose = require('mongoose');

const routes = require('./controllers');

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

const PORT = process.env.PORT || 5000;

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
