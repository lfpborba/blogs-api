const jwt = require('jsonwebtoken');
const postServices = require('../services/postServices');
const { User } = require('../database/models');

const { JWT_SECRET } = process.env;

const getAll = async (_req, res) => {
  try {
    const result = await postServices.getAll();

    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

const getById = async (req, res) => {
  const { id } = req.params;

  try {
    const results = await postServices.getById(id);

    if (results.message) {
      return res.status(404).json(results);
    }

    return res.status(200).json(results);
  } catch (err) {
    return res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

const createPost = async (req, res) => {
  const token = req.headers.authorization;
  const { email } = jwt.verify(token, JWT_SECRET);
  const { dataValues: { id } } = await User.findOne({
    where: { email },
  });

  try {
    const Info = req.body;

    const categoryValidated = await postServices.categoryValidate(Info.categoryIds);

    if (categoryValidated.message) {
      return res.status(400).json(categoryValidated);
    }
    const newPost = await postServices.createPost(Info, id);

    return res.status(201).json(newPost);
  } catch (err) {
    return res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

const postPUT = async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization;
  const { email } = jwt.verify(token, JWT_SECRET);

  const { dataValues: { id: userId } } = await User.findOne({
    where: { email },
  });

  try {
    const postUpdate = req.body;

    const author = await postServices.authorValidate(id, userId);

    if (author.message) {
      return res.status(401).json(author);
    }
    const postUpdated = await postServices.postPUT(postUpdate, id);

    return res.status(200).json(postUpdated);
  } catch (err) {
    return res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

module.exports = {
  getAll,
  getById,
  createPost,
  postPUT,
};