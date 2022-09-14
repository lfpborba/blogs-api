const postServices = require('../services/postServices');

const getAll = async (_req, res) => {
  try {
    const result = await postServices.getAll();

    console.log(result);

    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

module.exports = {
  getAll,
};