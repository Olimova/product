import { authMiddleware } from "./authMiddleware.js";

export const categoryMiddleware = (req, res, next) => {
  // Auth dan o'tgan foydalanuvchi uchun davom ettiramiz
  authMiddleware(req, res, () => {
    // Masalan, faqat admin foydalanuvchilarga ruxsat berish
    if (req.user?.role === "admin") {
      next();
    } else {
      res.status(403).send("Category access forbidden");
    }
  });
};
