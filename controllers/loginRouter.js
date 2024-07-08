const loginRouter = require("express").Router();
const User = require("../models/user");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

loginRouter.post("/login", async (request, response) => {
  const user = request.body;
  const userInDB = await User.findOne({ username: user.username });

  if (!userInDB) {
    return response.status(400).json({ error: "user not found" });
  }

  const isPasswordValid = await bcrypt.compare(
    user.password,
    userInDB.passwordHash
  );

  if (isPasswordValid) {
    const token = jwt.sign(userInDB.username, process.env.JWT_KEY);
    response.status(200).json(token);
  }
  response.status(400).end();
});

module.exports = loginRouter;
