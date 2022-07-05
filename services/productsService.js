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
  if (!name) return false;
  const result = await productsModel.addProduct(name);
  return result;
};

const update = async (id, name) => {
  const resultProduct = await productsModel.getById(id);
  if (!resultProduct) return resultProduct;
  const result = await productsModel.update(id, name);
  return result;
};

module.exports = {
  getAll,
  getById,
  addProduct,
  update,
};
