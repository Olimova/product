import { authMiddleware } from "./auth.middlewere.js";
import { Order } from "../models/index.js";

export const orderMiddleware = async (req, res, next) => {
  try {
    await authMiddleware(req, res, async () => {
      const orderId = req.params.id;

      const order = await Order.findById(orderId).exec();
      if (!order) {
        return res.status(404).send("Order not found");
      }

      if (order.user.toString() !== req.user._id.toString()) {
        return res.status(403).send("You are not allowed to access this order");
      }

      next();
    });
  } catch (err) {
    res.status(500).send("Server error");
  }
};
