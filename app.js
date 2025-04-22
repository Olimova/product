import express from "express";
import morgan from "morgan";

// import { User } from "./models/index.js";
// import {
//   customMiddelware,
//   newMiddeleware,
// } from "./middlewares/custom.middleware.js";
// import { roleGuard } from "./middlewares/guard.middleware.js";
// console.log(2);

import { appRouter } from "./src/router/index.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined"));

app.use("/api/v1", appRouter);
//role = user, moderator, guest, admin, superadmin

// app.use(
//   "/",
//   // roleGuard("user", "admin", "superadmin"),
//   newMiddeleware,
//   customMiddelware,
//   // customController.findAll,
// );

// app.use(ErrorMiddleware);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

export default app;
