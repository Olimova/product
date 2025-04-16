import { Category } from "../models/index.js";

export const categoryController = {
  create: async (req, res, next) => {
    try {
      const category = new Category(req.body);
      await category.save();

      res.status(201).send({
        status: "ok",
        data: category,
      });
    } catch (err) {
      next(err);
    }
  },
  update: async (req, res, next) => {
    try {
      const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return res.status(404).send({
        status: "error",
        message: "Category not found",
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
      const categories = await Category.find();

      res.status(201).json({
        status: "ok",
        data: categories,
      });
    } catch (err) {
      next(err);
    }
  },
  findOne:async (req, res, next) => {
    try {
      const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).send({
        status: "error",
        message: "Category not found",
      });
    }

    res.status(200).send({
      status: "ok",
      data: category,
    });
    } catch (err) {
      next(err);
    }
  },
  delete:async (req, res, next) => {
    try {
      const deletedCategory = await Category.findByIdAndDelete(req.params.id);

    if (!deletedCategory) {
      return res.status(404).send({
        status: "error",
        message: "Category not found",
      });
    }

    res.status(200).send({
      status: "ok",
      message: "Category deleted successfully",
    });
    } catch (err) {
      next(err);
    }
  },
};
