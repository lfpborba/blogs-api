const jwt = require('jsonwebtoken');
const userServices = require('../services/userServices');

const { JWT_SECRET } = process.env;

const createUser = async (req, res) => {
  try {
    const accountInfo = req.body;

    const newUser = await userServices.create(accountInfo);

    if (newUser.message) {
      return res.status(409).json(newUser);
    }

    const token = jwt.sign(accountInfo, JWT_SECRET);

    console.log(token);

    return res.status(201).json({ token });
  } catch (err) {
    return res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

module.exports = {
  createUser,
};