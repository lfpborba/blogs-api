const { Router } = require('express');

const userController = require('../controllers/userController');
const userValidate = require('../middlewares/userValidate');
const tokenValidate = require('../middlewares/tokenValidate');

const userRouter = Router();

userRouter.post('/', userValidate.userValidate, userController.createUser);
userRouter.get('/', tokenValidate.tokenValidate, userController.getAll);
userRouter.get('/:id', tokenValidate.tokenValidate, userController.getById);
userRouter.delete('/me', tokenValidate.tokenValidate, userController.destroy);

module.exports = userRouter;