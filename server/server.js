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
const uri = 'mongodb+srv://ibukunoluwa:J37XqVAVWWW6T9R@cluster0.lap5v.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('MongoDB Connected…');
  })
  // eslint-disable-next-line no-console
  .catch((err) => console.log(err));

app.use(bodyParser.urlencoded({ extended: true }));

// token verification jwt app.use(bla, bbla, bla)
// eslint-disable-next-line consistent-return
app.use(async (req, res, next) => {
  if (req.headers['x-access-token']) {
    const accessToken = req.headers['x-access-token'];
    const { userId, exp } = await jwt.verify(accessToken, process.env.JWT_SECRET);
    // Check if token has expired
    if (exp < Date.now().valueOf() / 1000) {
      return res.status(401).json({ error: 'JWT token has expired, please login to obtain a new one' });
    }
    res.locals.loggedInUser = await User.findById(userId); next();
  } else {
    next();
  }
});

app.use('/', routes); app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Server is listening on Port:', PORT);
});
