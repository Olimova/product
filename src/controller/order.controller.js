import { Order} from "../models/index.js";

export const orderController = {
  create: async (req, res, next) => {
    try {
      const order = new Order(req.body);
      await order.save();

      res.status(201).send({
        status: "ok",
        data: order,
      });
    } catch (err) {
      next(err);
    }
  },
  findAll: async (req, res, next) => {
    try {
      const order = await Order.find();

      res.status(201).json({
        status: "ok",
        data: order,
      });
    } catch (err) {
      next(err);
    }
  },
  findOne: async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);

      if (!order) {
        return res.status(404).send({
          status: "error",
          message: "Order not found",
        });
      }

      res.status(200).send({
        status: "ok",
        data: order,
      });
    } catch (err) {
      next(err);
    }
  },
  delete: async (req, res, next) => {
    try {
      const deletedCategory = await Order.findByIdAndDelete(req.params.id);

      if (!deletedCategory) {
        return res.status(404).send({
          status: "error",
          message: "Order not found",
        });
      }

      res.status(200).send({
        status: "ok",
        message: "Order deleted successfully",
      });
    } catch (err) {
      next(err);
    }
  },
};
