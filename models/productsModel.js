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
  console.log(rows);
  return rows;
};

module.exports = {
  getAll,
  getById,
};