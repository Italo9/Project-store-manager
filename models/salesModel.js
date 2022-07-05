const connection = require('../helpers/connection');

const getAll = async () => {
  const [rows] = await connection.execute(
    `SELECT * FROM StoreManager.sales_products 
    INNER JOIN StoreManager.sales 
    ON sales.id = sales_products.sale_id
    order by sales_products.sale_id ASC, sales_products.product_id ASC`,
  );
  return rows;
};

const getById = async (id) => {
  const [rows] = await connection.execute(
    `SELECT * FROM StoreManager.sales_products
    INNER JOIN StoreManager.sales 
    ON sales.id = sales_products.sale_id
    WHERE id = ?
    order by sales_products.sale_id ASC, sales_products.product_id ASC`,
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

const update = async (id, validateProduct) => {
  await Promise.all(validateProduct.map(async (element) => {
    await connection.execute(
      `UPDATE StoreManager.sales_products
      SET quantity = ?
      WHERE sale_id = ? and product_id = ?`,
      [element.quantity, id, element.productId],
    );
   }));

  const result = {
    saleId: id,
    itemsUpdated: validateProduct,
  };
  return result;
};

const exclude = async (id) => {
  connection.execute(
    `DELETE FROM StoreManager.sales_products
    WHERE sale_id = ?`,
    [id],
  );
  return [];
};

module.exports = {
  getAll,
  getById,
  addSales,
  update,
  exclude,
};