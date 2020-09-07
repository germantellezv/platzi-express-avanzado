const express = require("express");
const passport = require("passport");
const ProductsService = require("../../services/products");
const validation = require("../../utils/middlewares/validationHandler");
const {
  productIdSchema,
  productTagSchema,
  createProductSchema,
  updateProductSchema,
} = require("../../utils/schema/products");

// JWT
require("../../utils/auth/strategies/jwt.js");

function productsApi(app) {
  const router = express.Router();
  app.use("/api/products", router);
  const productService = new ProductsService();

  router.get("/", async function (req, res, next) {
    const { tags } = req.query;
    
    try {
      const products = await productService.getProducts({ tags });
      res.status(200).json({
        data: products,
        message: "products listed",
      });
    } catch (err) {
      next(err);
    }
  });

  router.get("/:productId", async function (req, res, next) {
    const { productId } = req.params;
    try {
      const product = await productService.getProduct({ productId });
      res.status(200).json({
        data: product,
        message: "product retrieved",
      });
    } catch (error) {
      next(error);
    }
  });

  router.post("/", validation(createProductSchema), async function (
    req,
    res,
    next
  ) {
    const { body: product } = req;
    try {
      const createdProduct = await productService.createProduct({ product });
      res.status(201).json({
        data: createdProduct,
        message: "product created",
      });
    } catch (error) {
      next(error);
    }
  });

  router.put(
    "/:productId",
    passport.authenticate("jwt", { session: false }),
    validation(productIdSchema, "params"),
    validation(updateProductSchema),
    async function (req, res, next) {
      const { productId } = req.params;
      const { body: product } = req;
      try {
        const updatedProduct = await productService.updateProduct({
          productId,
          product,
        });
        res.status(200).json({
          data: updatedProduct,
          message: "products updated",
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.delete(
    "/:productId",
    passport.authenticate("jwt", { session: false }),
    async function (req, res, next) {
      const { productId } = req.params;
      try {
        const deletedProduct = await productService.deleteProduct({
          productId,
        });
        res.status(200).json({
          data: deletedProduct,
          message: "products deleted",
        });
      } catch (error) {
        next(error);
      }
    }
  );
}

module.exports = productsApi;
