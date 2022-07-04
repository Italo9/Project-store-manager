const connection = require('../helpers/connection');

const getAll = async () => {
  const [rows] = await connection.execute(
    'SELECT * FROM StoreManager.products ORDER BY id',
  );
  return rows;
};

const getById = async (id) => {
  const [[rows]] = await connection.execute(
    `SELECT * FROM StoreManager.products
    WHERE id = ? 
    ORDER BY id`,
    [id],
  );
  return rows;
};

const addSales = async (arraySales) => {
  const [
    rowId,
  ] = await connection.execute(
    'INSERT INTO StoreManager.sales () VALUES()',
    );
  await Promise.all(arraySales.map(async (element) => {
    await connection.execute(
      'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES(?, ?, ?)',
      [rowId.insertId, element.productId, element.quantity],
    );
  }));
  const result = {
    id: rowId.insertId,
    itemsSold: arraySales,
  };
  return result;
};

module.exports = {
  getAll,
  getById,
  addSales,
};