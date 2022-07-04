const productsModel = require('../models/productsModel');

const getAll = async () => {
  const result = await productsModel.getAll();
  if (!result) return [];
  return result;
};

const getById = async (id) => {
  const result = await productsModel.getById(id);
  if (!result) return [];
  return result;
};

const addProduct = async (name) => {
  if (!name) {
    const infoName = { message: '"name" is required' };
    return infoName;
  } 
  if (name.length < 5) {
    const infoNameLength = { message: '"name" length must be at least 5 characters long' };
    return infoNameLength;
  }
  const result = await productsModel.addProduct(name);
  return result;
};

module.exports = {
  getAll,
  getById,
  addProduct,
};
