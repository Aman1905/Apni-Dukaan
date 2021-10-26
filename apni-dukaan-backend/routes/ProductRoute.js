const express = require('express');
const { getAllProducts, createProduct, updateProduct, deleteProduct, singleProductDetails } = require('../controllers/ProductController');
const router = express.Router();

router.route("/allProducts").get(getAllProducts)
router.route("/product/new").post(createProduct)
router.route("/product/:id").put(updateProduct)
router.route("/product/:id").delete(deleteProduct)
router.route("/product/:id").get(singleProductDetails)

module.exports = router