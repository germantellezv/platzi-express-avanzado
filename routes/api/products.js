const express = require("express");
const router = express.Router();
const ProductsService = require("../../services/products");
const { nextTick } = require("process");

const productsService = new ProductsService();

router.get("/", async function (req, res, next) {
  const { tags } = req.query;
  
  try {
    const products = await productsService.getProducts({ tags });

    res.status(200).json({
      data: products,
      message: "products listed",
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:productId", async function (req, res, next) {
  const { productId } = req.params;

  try {
    const product = await productsService.getProduct({ productId });
    
  } catch (error) {
    next(error)
  }

  res.status(200).json({
    data: product,
    message: "product retrieved",
  });
});

router.post("/", async function (req, res, next) {
  const { body: product } = req;
  
  try {
    const createdProduct = await productsService.createProduct({ product });
    
  } catch (error) {
    next(error)
  }
  res.status(201).json({
    data: createdProduct,
    message: "products created",
  });
});

router.put("/:productId", async function (req, res, next) {
  const { productId } = req.params;
  const { body: product } = req;

  try {
    const updatedProduct = await productsService.updateProduct({ productId, product });
    
  } catch (error) {
    next(error)
  }

  res.status(200).json({
    data: updatedProduct,
    message: "products updated",
  });
});

router.delete("/:productId", async function (req, res, next) {
  const { productId } = req.params;
  
  try {
    const deletedProduct = await productsService.deleteProduct({ productId });
    
  } catch (error) {
    next(error)
  }
  res.status(200).json({
    data: deletedProduct,
    message: "products deleted",
  });
});

module.exports = router;
