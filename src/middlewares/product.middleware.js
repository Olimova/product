import {basicAuthMiddleware} from "./auth.middlewere.js";

export const productMiddleware = (req, res, next) => {
  basicAuthMiddleware(req, res, () => {
    // Faqat admin yoki manager rolidagi foydalanuvchilar uchun
    if (["admin", "manager"].includes(req.user?.role)) {
      next();
    } else {
      res.status(403).send("Product access forbidden");
    }
  });
};
