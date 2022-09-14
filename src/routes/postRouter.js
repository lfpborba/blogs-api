const { Router } = require('express');

const postControl = require('../controllers/postController');
const tokenValidate = require('../middlewares/tokenValidate');
const postValid = require('../middlewares/postValidate');

const postRouter = Router();

postRouter.get('/', tokenValidate.tokenValidate, postControl.getAll);
postRouter.get('/:id', tokenValidate.tokenValidate, postControl.getById);
postRouter.post('/', tokenValidate.tokenValidate, postValid.postValidate, postControl.createPost);
postRouter.put('/:id', postValid.postValidate, tokenValidate.tokenValidate, postControl.postPUT);
postRouter.delete('/:id', tokenValidate.tokenValidate, postControl.deletePost);

module.exports = postRouter;