const { Category } = require('../database/models');

const getAll = async () => {
  const categories = await Category.findAll();

  return categories;
};

const createCategory = async (name) => {
  const validateCategory = await Category.findAll({
    where: { name },
  });

  if (validateCategory.length > 0) {
    return { message: 'Category already exists' };
  }

  const { dataValues } = await Category.create({ name });

  return dataValues;
};

module.exports = {
  getAll,
  createCategory,
};