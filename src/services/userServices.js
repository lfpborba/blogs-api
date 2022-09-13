const { User } = require('../database/models');

const getAll = async () => {
  const users = await User.findAll({
    attributes: { exclude: ['password'] },
  });

  return users;
};

const create = async (userInfo) => {
  const verifyUser = await User.findAll({
    where: { email: userInfo.email },
  });

  if (verifyUser.length > 0) {
    return { message: 'User already registered' };
  }

  await User.create(userInfo);

  return true;
};

module.exports = {
  getAll,
  create,
};