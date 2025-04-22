import { Router } from "express";
import { validateBody } from "../middlewares/validation.middleware.js";
import { categorySchema } from "../validation/category.validation.js";
import { basicAuthMiddleware } from "../middlewares/auth.middlewere.js";
import { categoryController } from "../controller/category.controller.js";

export const categoryRouter = Router();

categoryRouter
  .post(
    "/",
    basicAuthMiddleware,
    validateBody(categorySchema),
    categoryController.create
  )
  .get("/", categoryController.findAll)
  .get("/:id", categoryController.findOne)
  .put("/:id", basicAuthMiddleware, categoryController.update)
  .delete("/:id", basicAuthMiddleware, categoryController.delete)
  // .get("/profile", basicAuthMiddleware, categoryController.profile);
