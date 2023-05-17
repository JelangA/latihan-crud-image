const express = require('express');
const router = express.Router();
const productController = require('../controllers/ProductController');

router.get('/products', productController.getProduct);
router.get("/products/:id", productController.getProductById);
router.post("/products", productController.saveProduct);
router.patch("/products/:id", productController.updateProduct);
router.delete("/products/:id", productController.deleteProduct);

module.exports = router;