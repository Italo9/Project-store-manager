const productsService = require('../services/productsService');

const httpStatus = require('../helpers/httpStatusCode');

const getAll = async (req, res) => {
  try {
    const results = await productsService.getAll();
    if (!results) {
      return res.status(httpStatus.NOT_FOUND).json({ message: 'Product not ' });
    }
    res.status(httpStatus.OK).json(results);
  } catch (err) {
    console.error(err);
    res.status(httpStatus.INTERNAL_SERVER)
      .json({ message: 'Erro ao tentar realizar essa operação' });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await productsService.getById(id);
    if (!result || result.length < 1) {
      return res.status(httpStatus.NOT_FOUND).json({ message: 'Product not found' });
    }
    res.status(httpStatus.OK).json(result);
  } catch (err) {
    console.error(err);
    res.status(httpStatus.INTERNAL_SERVER).send('Erro ao tentar realizar operação');
  }
};

const searchProduct = async (req, res) => {
  try {
    const { q } = req.query;
    if (q.length === 0) {
      const resultProductsAll = await productsService.getAll();
      return res.status(httpStatus.OK).json(resultProductsAll);
    } 
    const result = await productsService.searchProduct(q);
    console.log('controller', result);
    res.status(httpStatus.OK).json(result);
  } catch (err) {
    console.error(err);
    res.status(httpStatus.INTERNAL_SERVER).send('Erro ao procurar');
  }
};

const addProduct = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(httpStatus.BAD_REQUEST).json({ message: '"name" is required' });
    } if (name.length < 5) {
      return res.status(httpStatus.UNPROCESSABLE_ENTITY)
        .json({ message: '"name" length must be at least 5 characters long' });
    }
    const result = await productsService.addProduct(name);
    res.status(httpStatus.CREATED).json(result);
  } catch (err) {
    console.error(err);
    res.status(httpStatus.INTERNAL_SERVER).send('Erro ao tentar realizar operação');
  }
};

const update = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(httpStatus.BAD_REQUEST).json({ message: '"name" is required' });
    } if (name.length < 5) {
      return res.status(httpStatus.UNPROCESSABLE_ENTITY)
        .json({ message: '"name" length must be at least 5 characters long' });
    }
    const { id } = req.params;

    const result = await productsService.update(id, name);

    if (!result) {
      return res.status(httpStatus.NOT_FOUND).json({ message: 'Product not found' });
    }
    return res.status(httpStatus.OK).json(result);
  } catch (err) {
    console.error(err);
    res.status(httpStatus.INTERNAL_SERVER).json({ message: 'Erro ao tentar realizar operação' });
  }
};

const exclude = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await productsService.exclude(id);
    if (!result) {
      return res.status(httpStatus.NOT_FOUND).json({ message: 'Product not found' });
    }
    if (result.length === 0) return res.status(httpStatus.NO_CONTENT).send('Excluído com sucesso');
  } catch (err) {
    console.error(err);
    res.status(httpStatus.INTERNAL_SERVER).json({ message: 'Erro ao tentar realizar operação' });
  }
};

module.exports = {
  getAll,
  getById,
  searchProduct,
  addProduct,
  update,
  exclude,
};