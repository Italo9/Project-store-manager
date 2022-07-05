const salesModel = require('../models/salesModel');
const productsService = require('./productsService');

const getAll = async () => {
  const result = await salesModel.getAll();
  const returnData = result.map((element) => {
    const { sale_id: saleId, product_id: productId, quantity, date, id } = element;
    const obj = {
      saleId,
      date,
      productId,
      quantity,
      id,
    };
    delete obj.id;
    return obj;
  });
  return returnData;
};

const getById = async (id) => {
  const result = await salesModel.getById(id);
  if (result.length === 0) return undefined;
  const returnData = result.map((element) => {
    const { sale_id: saleId, product_id: productId, quantity, date, id: xablau } = element;
    const obj = {
      saleId,
      date,
      productId,
      quantity,
      xablau,
    };
    delete obj.xablau;
    delete obj.saleId;
    return obj;
  });
  return returnData;
};

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

const exclude = async (id) => {
  const resultProduct = await salesModel.getById(id);
  if (resultProduct.length === 0) return !resultProduct;
  const result = await salesModel.exclude(id);
  return result;
};

module.exports = {
  getAll,
  getById,
  addSales,
  exclude,
};