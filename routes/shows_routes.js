const express = require('express');
const showsController = require('../controllers/show_controller');
const { requiresAuth } = require('express-openid-connect');

const multer = require('multer');
const showRouter = express.Router();

const upload = multer({ dest: 'uploads/' });
// Define routes for shows
showRouter.get('/', showsController.getAll);
showRouter.post(
  '/',
  requiresAuth(),
  upload.single('image'),
  showsController.create
);
showRouter.get('/:id', showsController.getById);
showRouter.put(
  '/:id',
  requiresAuth(),
  upload.single('image'),
  showsController.update
);
showRouter.delete('/:id', requiresAuth(), showsController.delete);

module.exports = showRouter;
