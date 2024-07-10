const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const toDoRouter = require("./controllers/toDoRouter");
const userRouter = require("./controllers/userRouter");
const loginRouter = require("./controllers/loginRouter");
const {
  tokenCleanUp,
  errorHandler,
  decodeToken,
} = require("./configs/middleware");

const app = express();
const port = 3000;

mongoose.connect(process.env.MONGODB_URL);

app.use(express.json());

app.get("/", (request, response) => {
  response.send("<h1>hello world</h1>");
});

app.use("/api", loginRouter);
app.use("/api", userRouter);
app.use("/api", tokenCleanUp, decodeToken, toDoRouter);
app.use(errorHandler);

app.listen(port, () => console.log("server started on port 3000"));
