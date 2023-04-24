const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const seriesRouter = require('./routes/series_routes');
const authRouter = require('./routes/auth_routes');
const showsRouter = require('./routes/shows_routes');
const { auth } = require('express-openid-connect');
const profileRouter = require('./routes/profile_routes');
const webRouter = require('./routes/web_routes');
require('dotenv').config();

const app = express();

const config = {
  authRequired: process.env.AUTH_REQUIRED === 'true',
  auth0Logout: process.env.AUTH0_LOGOUT === 'true',
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
};

app.use(
  auth(config, {
    response_mode: 'query',
  })
);

mongoose.connect(process.env.MONGOURI, {
  useNewUrlParser: true,
});

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use('/', webRouter);
app.use('/auth', authRouter);
app.use('/profile', profileRouter);
app.use('/series', seriesRouter);
app.use('/shows', showsRouter);
app.use((req, res, next) => {
  res.header('Content-Type', 'application/json');
  next();
});

module.exports = app;
