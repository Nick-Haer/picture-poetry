const express = require('express');

const dbConnection = require('./dbConnection');

require('dotenv').config();

const app = express();

const mongoose = require('mongoose');

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

const PORT = process.env.PORT || 3000;

dbConnection();

app.listen(PORT, () => console.log(`app listening on port ${PORT}`));
