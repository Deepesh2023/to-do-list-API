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
    return response.json({ username: userInDB.username, token });
  }
  
  response.status(400).send({ error: "incorrect password" });
});

module.exports = loginRouter;
