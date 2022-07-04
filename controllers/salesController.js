const salesService = require('../services/salesService');

const httpStatus = require('../helpers/httpStatusCode');

const getAll = async (req, res) => {
  try {
    const results = await salesService.getAll();
    if (!results) {
      return res.status(httpStatus.NOT_FOUND).json({ message: 'Sale not found' });
    }
    res.status(httpStatus.OK).json(results);
  } catch (err) {
    console.error(err);
    res.status(httpStatus.INTERNAL_SERVER).json({ message: 'Erro ao tentar realizar operação' });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await salesService.getById(id);
    if (!result) {
      return res.status(httpStatus.NOT_FOUND).json({ message: 'Sale not found' });
    }
    res.status(httpStatus.OK).json(result);
  } catch (err) {
    console.error(err);
    res.status(httpStatus.INTERNAL_SERVER).send('Erro ao tentar realizar operação');
  }
};

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
  getAll,
  getById,
  addSales,
  };