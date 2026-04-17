// backend/src/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Define que a requisição GET na raiz desta rota chamará a função getProducts
router.get('/', productController.getProducts);

module.exports = router;