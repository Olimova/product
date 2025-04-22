import { Router } from "express";
import { orderController } from "../controller";
import { basicAuthMiddleware } from "../middlewares/auth.middlewere";
import { orderMiddleware } from "../middlewares/order.middleware";

export const orderRouter = Router();

orderRouter
  .post("/", basicAuthMiddleware, orderController.create)
  .get("/", orderController.findAll)
  .get("/:id", orderController.findOne)
  .put("/:id", basicAuthMiddleware, orderController.update)
  .delete("/:id", basicAuthMiddleware, orderController.delete)
  // .get("/profile", orderMiddleware, orderController.profile);
