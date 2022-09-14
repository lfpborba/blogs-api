const { User } = require('../database/models');

const getAll = async () => {
  const users = await User.findAll({
    attributes: { exclude: ['password'] },
  });

  return users;
};

const getById = async (id) => {
  const userId = await User.findOne({
    where: { id },
    attributes: { exclude: ['password'] },
  });

  if (!userId) {
    return { message: 'User does not exist' };
  }

  return userId;
};

const create = async (userInfo) => {
  const validateUser = await User.findAll({
    where: { email: userInfo.email },
  });

  if (validateUser.length > 0) {
    return { message: 'User already registered' };
  }

  await User.create(userInfo);

  return true;
};

module.exports = {
  getAll,
  getById,
  create,
};