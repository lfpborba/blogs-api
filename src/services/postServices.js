const { BlogPost, Category, User } = require('../database/models');

const getAll = async () => {
  const results = await BlogPost.findAll({
    include: [{
        model: User,
        as: 'user',
        attributes: {
          exclude: ['password'],
        },
       }, {
        model: Category,
        as: 'categories',
        through: { attributes: [] },
    }],
  });

  return results;
};

const getById = async (id) => {
  const results = await BlogPost.findOne({
    where: { id },
    include: [{
      model: User,
      as: 'user',
      attributes: {
        exclude: ['password'],
      },
     }, {
      model: Category,
      as: 'categories',
      through: { attributes: [] },
    }],
  });

  if (!results) return { message: 'Post does not exist' };

  return results;
};

module.exports = {
  getAll,
  getById,
};