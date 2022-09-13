const jwt = require('jsonwebtoken');
const userServices = require('../services/userServices');

const { JWT_SECRET } = process.env;

const getAll = async (_req, res) => {
  try {
    const users = await userServices.getAll();

    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const userById = await userServices.getById(id);

    if (userById.message) {
      return res.status(404).json(userById);
    }

    return res.status(200).json(userById);
  } catch (err) {
    return res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

const createUser = async (req, res) => {
  try {
    const accountInfo = req.body;
    const newUser = await userServices.create(accountInfo);

    if (newUser.message) {
      return res.status(409).json(newUser);
    }

    const token = jwt.sign(accountInfo, JWT_SECRET);

    return res.status(201).json({ token });
  } catch (err) {
    return res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

module.exports = {
  getAll,
  getById,
  createUser,
};