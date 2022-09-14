const { BlogPost, PostCategory, Category, sequelize, User } = require('../database/models');

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

const categoryValidate = async (categoryIds) => {
  const { rows } = await Category.findAndCountAll({
    where: {
      id: categoryIds,
    },
  });

  if (rows.length !== categoryIds.length) {
    return { message: '"categoryIds" not found' };
  }

  return true;
};

const createPost = async (postInfo, userId) => {
  const { title, content } = postInfo;
  const result = await sequelize.transaction(async (transaction) => {
    const createdPost = await BlogPost.create(
      { title, content, userId },
      { transaction },
    );

    const postId = createdPost.dataValues.id;

    const postCategories = postInfo.categoryIds
      .map((categoryId) => ({ postId, categoryId }));

    await PostCategory.bulkCreate(
      postCategories,
      { transaction },
    );

    return createdPost;
  });

  return result;
};

const authorValidate = async (postId, userId) => {
  const result = await BlogPost.findOne({
    where: { id: postId },
  });

  if (!result) return { message: 'Post does not exist', code: 404 };
  if (result.userId !== userId) return { message: 'Unauthorized user', code: 401 };

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

const deletePost = async (postId) => {
  await BlogPost.destroy({
    where: { id: postId },
  });
  return { message: 'Post deleted' };
};

module.exports = {
  getAll,
  getById,
  categoryValidate,
  createPost,
  authorValidate,
  postPUT,
  deletePost,
};