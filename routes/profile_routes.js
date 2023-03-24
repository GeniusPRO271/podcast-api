const { requiresAuth } = require('express-openid-connect');
const express = require('express');

const profileRouter = express.Router();

profileRouter.get('/', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

module.exports = profileRouter;
