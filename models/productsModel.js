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

const addProduct = async (name) => {
  const [
    row,
  ] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?)',
    [name],
  );
  const result = {
    id: row.insertId,
    name,
  };
  return result;
};

const update = async (id, name) => {
   await connection.execute(
    `UPDATE StoreManager.products
      SET name = ?
      WHERE id = ?`,
    [name, id],
  );
  
  return {
    id,
    name,
  };
};

module.exports = {
  getAll,
  getById,
  addProduct,
  update,
};