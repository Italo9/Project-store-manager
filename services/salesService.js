const salesModel = require('../models/salesModel');
const productsService = require('./productsService');

const validateProductId = async (element) => {
  if (!element.productId) return { status: 400, message: { message: '"productId" is required' } };
  const productExists = await productsService.getById(element.productId);
  if (productExists.length === 0) {
  return {
    status: 404, message: { message: 'Product not found' },
  }; 
}
};

const validateQuantity = (element) => {
  if (element.quantity < 0 || element.quantity === 0) {
    return {
      status: 422, message: { message: '"quantity" must be greater than or equal to 1' },
    };
  }
  if (!element.quantity) {
    return {
      status: 400, message: { message: '"quantity" is required' },
    };
  }
};

const assistantAddSales = async (arraySales) => Promise.all(arraySales.map(async (element) => {
    const validateProduct = await validateProductId(element);
    if (validateProduct && validateProduct.message) {
      return validateProduct;
    }
    const validateQuantit = validateQuantity(element);
    if (validateQuantit && validateQuantit.message) {
      return validateQuantit;
    }
    return element;
  }));

const addSales = async (arraySales) => {
  const validateProduct = await assistantAddSales(arraySales);
  const comErro = validateProduct.filter((element) => (element.message));
  if (comErro.length > 0) {
    return comErro;
  } 
  const bankRequisition = await salesModel.addSales(validateProduct);
  return bankRequisition;
};

module.exports = {
  addSales,
};