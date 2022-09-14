const { Router } = require('express');

const postController = require('../controllers/postController');
const tokenValidate = require('../middlewares/tokenValidate');
const postValidate = require('../middlewares/postValidate');

const postRouter = Router();

postRouter.get('/', tokenValidate.tokenValidate, postController.getAll);
postRouter.get('/:id', tokenValidate.tokenValidate, postController.getById);
postRouter.put('/:id', postValidate.postValidate,
tokenValidate.tokenValidate, postController.postPUT);

module.exports = postRouter;