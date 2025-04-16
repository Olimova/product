import { User } from "../models/index.js";
export const userController = {
  profile:async (req, res, next) => {
    try {
      if (!req.user || !req.user.id) {
      return res.status(401).send({
        status: "error",
        message: "Unauthorized: User not logged in",
      });
    }

    const user = await User.findById(req.user.id).select("-password"); 

    if (!user) {
      return res.status(404).send({
        status: "error",
        message: "User not found",
      });
    }

    res.status(200).send({
      status: "ok",
      data: user,
    });
    } catch (err) {
      next(err);
    }
  },
  update:async (req, res, next) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).send({
        status: "error",
        message: "User not found",
      });
    }

    res.status(200).send({
      status: "ok",
      data: updatedUser,
    });

    } catch (err) {
      next(err);
    }
  },
  delete:async (req, res, next) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).send({
        status: "error",
        message: "User not found",
      });
    }

    res.status(200).send({
      status: "ok",
      message: "User deleted successfully",
    });
    } catch (err) {
      next(err);
    }
  },
};
