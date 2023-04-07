const express = require('express');
const seriesController = require('../controllers/series_controller');
const { requiresAuth } = require('express-openid-connect');
const multer = require('multer');
const serieRouter = express.Router();

const upload = multer({ dest: 'uploads/' });
// Define routes for series
serieRouter.get('/', seriesController.getAll);
serieRouter.post(
  '/',
  upload.fields([
    { name: 'imagesMain', maxCount: 1 }, // For single file
    { name: 'sampleImages[]', maxCount: 10 }, // For array of files
  ]),
  seriesController.create
);
serieRouter.get('/:id', seriesController.getById);
serieRouter.put(
  '/:id',
  upload.fields([
    { name: 'imagesMain', maxCount: 1 }, // For single file
    { name: 'images[]', maxCount: 10 }, // For array of files
  ]),
  requiresAuth(),
  seriesController.update
);
serieRouter.delete('/:id', requiresAuth(), seriesController.deleteById);

module.exports = serieRouter;
