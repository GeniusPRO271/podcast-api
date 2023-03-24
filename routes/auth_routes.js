const express = require('express');
const { requiresAuth } = require('express-openid-connect');

const Auth = express.Router();

Auth.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

Auth.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

module.exports = Auth;
