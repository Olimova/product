import {status} from 'http-status'

import {jwtRefreshTokenGenerator} from '../common/jwt.js'
import {User} from '../models/index.js'
export const authController = {
  // create: async (req, res, next) => {
  //   try {
  //     const user = new User(req.body);
  //     await user.save();

  //     res.status(201).send({
  //       status: "ok",
  //       data: user,
  //     });
  //   } catch (err) {
  //     next(err);
  //   }
  // },
  // update: async (req, res, next) => {
  //   try {
  //     const updated = await User.findByIdAndUpdate(
  //       req.params.id,
  //       req.body,
  //       { new: true, runValidators: true }
  //     );

  //     if (!updated) {
  //       return res.status(404).send({
  //         status: "error",
  //         message: "User not found",
  //       });
  //     }

  //     res.status(200).send({
  //       status: "ok",
  //       data: updated,
  //     });
  //   } catch (err) {
  //     next(err);
  //   }
  // },


  // delete:async (req, res, next) => {
  //   try {
  //     const deleted = await User.findByIdAndDelete(req.params.id);

  //   if (!deleted) {
  //     return res.status(404).send({
  //       status: "error",
  //       message: "User not found",
  //     });
  //   }

  //   res.status(200).send({
  //     status: "ok",
  //     message: "User deleted successfully",
  //   });
  //   } catch (err) {
  //     next(err);
  //   }
  // },


  signUp: async (req, res, next) => {
    try {
      const body = req.body;
      const user = await User.findOne({ email: body.email }, "email_id").exec();
      console.log(user);
      if (!user) {
        const newUser = await User(body);
        await newUser.save();
        res.send(201).send(newUser);
      }
      res.send("User already exists!;");
      return;
    } catch (error) {
      next(error);
    }
  },

  signIn: async (req, res, next) => {
    //login
    try {
      const body = req.body;
      const user = await User.findOne({ email: body.email });
      if (!user) {
        res.send("User not found!");
        return;
      }
      const validaPass = await user.isValidPassword(body.password)

      if (!validaPass) {
        res.status(401).send("Password is not valid!");
        return;
      }

      const accessPayload = {
        sub: user._id,
        name: user.full_name,
        role: "user",
        staff: "1",
      };

      const refreshPayload = {
        sub: user._id,
        name: user.full_name,
        role: "user",
        staff: "1",
      };

      const accessToken = jwtAccessTokenGenerator(accessPayload);
      const refreshToken = jwtRefreshTokenGenerator(refreshPayload);
      res.send({
        message: "ok",
        data: {
          accessToken,
          refreshToken,
        },
      });
    } catch (err) {
      next(err);
    }
  },


  profile: (req, res, next) => {
    try {
      console.log();

      res.json({
        message: "ok",
        data: req.user,
      });
    } catch (err) {
      next(err);
    }
  },
};

