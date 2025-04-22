import { Router } from "express";
import { basicAuthMiddleware } from "../middlewares/auth.middlewere";
import { userController } from "../controller";

export const userRouter = Router();

productRouter
  .post(
    "/",
    basicAuthMiddleware,
    validateBody(userSchema),
    userController.create
  )
  .put("/:id", basicAuthMiddleware, userController.update)
  .delete("/:id", basicAuthMiddleware, userController.delete)
  .get("/profile", userController.profile);

