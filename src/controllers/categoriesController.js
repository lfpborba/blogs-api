const categoriesServices = require('../services/categoriesServices.js');

const getAll = async (_req, res) => {
  try {
    const categories = await categoriesServices.getAll();

    return res.status(200).json(categories);
  } catch (err) {
    return res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const createCategories = await categoriesServices.createCategory(name);

    if (createCategories.message) {
      return res.status(409).json(createCategories);
    }

    return res.status(201).json(createCategories);
  } catch (err) {
    return res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

module.exports = {
  getAll,
  createCategory,
};