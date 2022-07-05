const express = require('express');

const salesController = require('../controllers/salesController');

const router = express.Router();

router.get('/', salesController.getAll);
router.get('/:id', salesController.getById);
router.post('/', salesController.addSales);
router.put('/:id', salesController.update);
router.delete('/:id', salesController.exclude);

module.exports = router;