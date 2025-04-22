import { User } from "../models/index.js";

export const basicAuthMiddleware = async (req, res, next) => {
  try {
    const str = (req.headers.authorization || "").split(" ")[1] || "";

    const [userEmail, userPassword] = Buffer.from(str, "base64")
      .toString()
      .split(":");

    console.log("userEmail", userEmail);
    console.log("userPassword", userPassword);
    const user = await User.findOne({ email: userEmail }).exec();

    if (!user) {
      return res.status(401).send("Authentication required.");
    }

    if (
      userEmail &&
      userPassword &&
      userEmail === user.email &&
      userPassword === user.password
    ) {
      req.user = user;

      next();
      return;
    }

    res.status(401).send("Authentication required.");
  } catch (err) {
    console.log("Error in auth middleware", err);
    next(err);
  }

  const authMiddleware = async (req, res, next) => {
    try {
      const [type, token] = (req.headers.authorization || "").split(" ");

      if (type !== "Bearer") {
        return res.status(403).send("Authentication required.");
      }

      const decoded = await jwtAcessTokenVerify(token);
      console.log({ decoded });
      const user = await User.findById(decoded.sub);

      console.log({ user });
      if (!user) {
        return res.status(401).send("Authentication required.");
      }

      req.user = user;

      next();
    } catch (err) {
      console.log("Error in auth middleware", err);
      next(err);
    }
  };
};

export default basicAuthMiddleware;
