import { Router } from "express";
import { productSchema } from "../validation/index.js";
import { validateBody } from "../middlewares/validation.middleware.js";
import { basicAuthMiddleware } from "../middlewares/auth.middlewere.js";
import { productMiddleware } from "../middlewares/product.middleware.js";
import { productController } from "../controller/product.controller.js";

export const productRouter = Router();

productRouter
  .post(
    "/",
    basicAuthMiddleware,
    validateBody(productSchema),
    productController.create
  )
  .get("/", productController.findAll)
  .get("/:id", productController.findOne)
  .put("/:id", basicAuthMiddleware, productController.update)
  .delete("/:id", basicAuthMiddleware, productController.delete)
  // .get("/profile", productMiddleware, productController.profile);
