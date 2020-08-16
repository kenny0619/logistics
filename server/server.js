const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const path = require('path');
const User = require('./models/userModel');
const routes = require('./routes/route.js');

require('dotenv').config({
  path: path.join(__dirname, '../.env'),
});

const app = express();

const PORT = process.env.PORT || 3000;

// mongoose connection

app.use(bodyParser.urlencoded({ extended: true }));

// token verification jwt app.use(bla, bbla, bla)

app.use('/', routes); app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Server is listening on Port:', PORT);
});
