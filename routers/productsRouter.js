const express = require('express');

const productsController = require('../controllers/productsController');

const router = express.Router();

router.get('/', productsController.getAll);
router.get('/search/', productsController.searchProduct);
router.get('/:id', productsController.getById);
router.post('/', productsController.addProduct);
router.put('/:id', productsController.update);
router.delete('/:id', productsController.exclude);

module.exports = router;