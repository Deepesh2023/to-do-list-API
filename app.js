const express = require("express");

const toDoRouter = require("./controllers/toDoRouter");
const userRouter = require("./controllers/userRouter");
const loginRouter = require("./controllers/loginRouter");
const {
  tokenCleanUp,
  decodeToken,
  errorHandler,
} = require("./configs/middleware");

const app = express();

app.use(express.json());
app.use("/api", loginRouter);
app.use("/api", userRouter);
app.use("/api", tokenCleanUp, decodeToken, toDoRouter);
app.use(errorHandler);

module.exports = app;
