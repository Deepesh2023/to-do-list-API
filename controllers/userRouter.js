const userRouter = require("express").Router();
const User = require("../models/user");

const bcrypt = require("bcrypt");
const saltRounds = 12;

userRouter.post("/users", async (request, response) => {
  const newUser = request.body;

  const exsistingUser = await User.findOne({ username: newUser.username });
  if (exsistingUser) {
    return response.status(400).send({ error: "username already taken" });
  }

  const password = newUser.password;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username: newUser.username,
    passwordHash,
  });

  await user.save();
  response.status(201).end();
});

module.exports = userRouter;
