const userRouter = require("express").Router();
const User = require("../models/user");

const bcrypt = require("bcrypt");
const saltRounds = 12;

userRouter.post("/users", async (request, response) => {
  const newUser = request.body;

  const password = newUser.password;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username: newUser.username,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).send(savedUser);
});

module.exports = userRouter;
