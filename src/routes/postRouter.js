const { Router } = require('express');

const postController = require('../controllers/postController');
const tokenValidate = require('../middlewares/tokenValidate');

const postRouter = Router();

postRouter.get('/', tokenValidate.tokenValidate, postController.getAll);

module.exports = postRouter;