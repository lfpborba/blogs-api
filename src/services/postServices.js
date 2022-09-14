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

const authorValidate = async (postId, userId) => {
  const results = await BlogPost.findOne({
    where: { id: postId },
  });

  if (results.userId !== userId) return { message: 'Unauthorized user' };

  return true;
};

const postPUT = async (info, postId) => {
  const { title, content } = info;

  await BlogPost.update(
    { title, content },
    { where: { id: postId } },
  );

  const postUpdated = await getById(postId);

  return postUpdated;
};

module.exports = {
  getAll,
  getById,
  authorValidate,
  postPUT,
};