const jwt = require('jsonwebtoken');
const loginService = require('../services/loginServices');

const { JWT_SECRET } = process.env;

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log(email, password);

    const account = await loginService.login(email, password);

    if (account.message) {
      return res.status(400).json(account);
    }

    const token = jwt.sign({ email, password }, JWT_SECRET);

    console.log(token);

    return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

module.exports = {
  login,
};