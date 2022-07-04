const salesService = require('../services/salesService');

const httpStatus = require('../helpers/httpStatusCode');

const addSales = async (req, res) => {
    const arraySales = req.body;
    const result = await salesService.addSales(arraySales);
    const typeResult = Array.isArray(result);
    if (typeResult) {
      result.find((element) => {
        if (element.message) {
          return res.status(element.status).json(element.message);
        } return res.status(httpStatus.CREATED).json(result);
      });
    } else {
      res.status(httpStatus.CREATED).json(result);
    }
  };
  
  module.exports = {
    addSales,
  };