const express = require("express");
const router = express.Router();
const ProductsService = require("../../services/products");
const productService = new ProductsService();

// const productMocks = require('../utils/mocks/products')

router.get("/", async function (req, res) {
  const { tags } = req.query;
  
  try {
    const products = await productService.getProducts({ tags });
    res.render("products", {
      products,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
