const loginRouter = require("express").Router();
const User = require("../models/user");

const bcrypt = require("bcrypt");

loginRouter.post("/login", async (request, response) => {
  const user = request.body;
  const userInDB = await User.findOne({ username: user.username });

  const isPasswordValid = await bcrypt.compare(
    user.password,
    userInDB.passwordHash
  );

  if (isPasswordValid) {
    response.status(200).send(user);
  }
  response.status(400).end();
});

module.exports = loginRouter;
