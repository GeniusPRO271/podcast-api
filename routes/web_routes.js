const express = require('express');
const webController = require('../controllers/web_controller');
const { requiresAuth } = require('express-openid-connect');
const webRouter = express.Router();

// Define routes for shows
webRouter.get('/', requiresAuth(), webController.main);
webRouter.get('/createShow', requiresAuth(), webController.createShow);
webRouter.get('/createSerie', requiresAuth(), webController.createSerie);
webRouter.get('/deleteShow', requiresAuth(), webController.deleteShow);
webRouter.get('/deleteSerie', requiresAuth(), webController.deleteSerie);
webRouter.get('/editShow', requiresAuth(), webController.editShow);
webRouter.get('/editSerie', requiresAuth(), webController.editSerie);

module.exports = webRouter;
