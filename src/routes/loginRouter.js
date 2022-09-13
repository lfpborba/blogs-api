const { Router } = require('express');

const loginController = require('../controllers/loginController');
const validate = require('../middlewares/loginValidate');

const loginRouter = Router();

loginRouter.post('/', validate.loginValidate, loginController.login);

module.exports = loginRouter;