const express = require('express');
const showsController = require('../controllers/show_controller');
const { requiresAuth } = require('express-openid-connect');
const showRouter = express.Router();

// Define routes for shows
showRouter.get('/', showsController.getAll);
showRouter.post('/', requiresAuth(), showsController.create);
showRouter.get('/:id', showsController.getById);
showRouter.put('/:id', requiresAuth(), showsController.update);
showRouter.delete('/:id', requiresAuth(), showsController.delete);

module.exports = showRouter;
