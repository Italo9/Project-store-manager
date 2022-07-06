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

const update = async (req, res) => {
    const { id } = req.params;
    const arraySales = req.body;

  const result = await salesService.update(id, arraySales);
    const typeResult = Array.isArray(result);
    if (typeResult) {
      result.find((element) => {
        if (element.message) {
          return res.status(element.status).json(element.message);
        } return res.status(httpStatus.OK).send(result);
      });
    } else {
      res.status(httpStatus.OK).json(result);
    }
};
  
const exclude = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await salesService.exclude(id);
    if (!result) {
      return res.status(httpStatus.NOT_FOUND).json({ message: 'Sale not found' });
    }
    if (result.length === 0) return res.status(httpStatus.NO_CONTENT).send('Deletado com sucesso');
  } catch (err) {
    console.error(err);
    res.status(httpStatus.INTERNAL_SERVER).json({ message: 'Erro ao tentar realizar operação' });
  }
};
  
module.exports = {
  getAll,
  getById,
  addSales,
  update,
  exclude,
  };