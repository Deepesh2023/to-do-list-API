const toDoRouter = require("express").Router();
const User = require("../models/user");
const ToDo = require("../models/toDo");

const jwt = require("jsonwebtoken");

toDoRouter.get("/todos", async (request, response) => {
  const token = request.headers.authorization;
  const username = jwt.verify(token, process.env.JWT_KEY);

  const toDos = await ToDo.find({ user: username });
  response.json(toDos);
});

toDoRouter.post("/todos", async (request, response) => {
  const token = request.headers.authorization;

  const username = jwt.verify(token, process.env.JWT_KEY);

  const user = await User.findOne({ username: username });
  if (user) {
    const toDo = new ToDo({
      toDo: request.body.toDo,
      user: username,
      isDone: false,
    });

    const newToDo = await toDo.save();
    return response.json(newToDo);
  }

  response.status(400).end();
});

module.exports = toDoRouter;
