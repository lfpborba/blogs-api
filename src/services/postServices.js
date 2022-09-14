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

module.exports = {
  getAll,
};