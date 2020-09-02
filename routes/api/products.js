const express = require("express");
const router = express.Router();
const ProductsService = require("../../services/products");

const productsService = new ProductsService();

router.get("/", function (req, res) {
  const { tags } = req.query;

  const products = productsService.getProducts({ tags });

  res.status(200).json({
    data: products,
    message: "products listed",
  });
});

router.get("/:productId", function (req, res) {
  const { productId } = req.params;

  const product = productsService.getProduct({ productId });

  res.status(200).json({
    data: product,
    message: "product retrieved",
  });
});

router.post("/", function (req, res) {
  const { body } = req;
  const product = productsService.createProduct({ product });

  res.status(201).json({
    data: productMocks[0],
    message: "products created",
  });
});

router.put("/:productId", function (req, res) {
  const { productId } = req.params;
  res.status(200).json({
    data: productMocks,
    message: "products updated",
  });
});

router.delete("/:productId", function (req, res) {
  const { productId } = req.params;
  res.status(200).json({
    data: productMocks,
    message: "products deleted",
  });
});

module.exports = router;
