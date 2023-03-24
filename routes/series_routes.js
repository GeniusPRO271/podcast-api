const express = require('express');
const seriesController = require('../controllers/series_controller');
const { requiresAuth } = require('express-openid-connect');
const serieRouter = express.Router();

// Define routes for series
serieRouter.get('/', seriesController.getAll);
serieRouter.post('/', requiresAuth(), seriesController.create);
serieRouter.get('/:id', seriesController.getById);
serieRouter.put('/:id', requiresAuth(), seriesController.update);
serieRouter.delete('/:id', requiresAuth(), seriesController.deleteById);

module.exports = serieRouter;
