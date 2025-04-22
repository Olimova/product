import { Router } from "express"; // Import Router from express
import { basicAuthMiddleware } from "../middlewares/auth.middlewere.js";
import { validateBody } from "../middlewares/validation.middleware.js";
import { authSchema } from "../validation/auth.validation.js";
import { authController } from "../controller/auth.controller.js";

export const authRouter = Router();

authRouter
  .post("/signup", validateBody(authSchema.signUp), authController.signUp)
  .post("/signin", validateBody(authSchema.signIn), authController.signIn)
  .get("/profile", basicAuthMiddleware, authController.profile)
  .post("/", basicAuthMiddleware, authController.create)
  .put("/:id", basicAuthMiddleware, authController.update)
  .delete("/:id", basicAuthMiddleware, authController.delete);
