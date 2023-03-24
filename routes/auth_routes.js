const express = require('express');
const { requiresAuth } = require('express-openid-connect');

const auth = express.Router();

auth.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

module.exports = auth;
