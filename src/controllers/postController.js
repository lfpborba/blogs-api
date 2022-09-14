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

module.exports = {
  getAll,
  getById,
};