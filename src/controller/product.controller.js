import { Product } from "../models/index.js";

export const productController = {
  create: async (req, res, next) => {
    try {
      const product = new Product(req.body);

      await product.save();

      res.status(201).send(product);
    } catch (err) {
      next(err);
    }
  },
  update:async (req, res, next) => {
    try {
      const updatedCategory = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return res.status(404).send({
        status: "error",
        message: "Product not found",
      });
    }

    res.status(200).send({
      status: "ok",
      data: updatedCategory,
    });
    } catch (err) {
      next(err);
    }
  },
  findAll: async (req, res, next) => {
    try {
      const { page = 1, limit = 10, lang = "uz", mode = "dark" } = req.query;
      const [fValue, sValues] = userList;
      // const page = req.query.page || 1
      // const limit = req.query.limit || 10

      const products = await Product.find()
        .populate("product", "name")
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort({ createdAt: -1 });
      // const products = await Product.find();

      res.status(200).send(products);
    } catch (err) {
      next(err);
    }
  },
  findOne:async (req, res, next) => {
    try {
      const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).send({
        status: "error",
        message: "Product not found",
      });
    }

    res.status(200).send({
      status: "ok",
      data: product,
    });
    } catch (err) {
      next(err);
    }
  },
  delete:async (req, res, next) => {
    try {
      const deletedCategory = await Product.findByIdAndDelete(req.params.id);

    if (!deletedCategory) {
      return res.status(404).send({
        status: "error",
        message: "Product not found",
      });
    }

    res.status(200).send({
      status: "ok",
      message: "Product deleted successfully",
    });
    } catch (err) {
      next(err);
    }
  },
};
