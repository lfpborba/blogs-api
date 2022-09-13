const { Router } = require('express');

const userController = require('../controllers/userController');
const userValidate = require('../middlewares/userValidate');
const tokenValidate = require('../middlewares/tokenValidate');

const userRouter = Router();

userRouter.post('/', userValidate.userValidate, userController.createUser);
userRouter.get('/', tokenValidate.tokenValidate, userController.getAll);

module.exports = userRouter;