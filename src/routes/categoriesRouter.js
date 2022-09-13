const { Router } = require('express');

const categoriesController = require('../controllers/categoriesController.js');
const tokenValidate = require('../middlewares/tokenValidate');
const categoriesValidate = require('../middlewares/categoriesValidate');

const categoryRouter = Router();

categoryRouter.get('/', tokenValidate.tokenValidate, categoriesController.getAll);
categoryRouter.post('/', tokenValidate.tokenValidate,
categoriesValidate.validCategory, categoriesController.createCategory);

module.exports = categoryRouter;