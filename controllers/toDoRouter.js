const toDoRouter = require("express").Router();

const User = require("../models/user");
const ToDo = require("../models/toDo");

toDoRouter.get("/todos", async (request, response, next) => {
  const username = request.headers.username;

  const toDos = await ToDo.find({ user: username });
  response.json(toDos);
});

toDoRouter.post("/todos", async (request, response, next) => {
  const username = request.headers.username;

  const userInDB = await User.findOne({ username: username });
  if (userInDB) {
    const toDo = new ToDo({
      toDo: request.body.toDo,
      user: userInDB.username,
      isDone: false,
    });

    const newToDo = await toDo.save();
    return response.json(newToDo);
  } else {
    response.status(400).end();
  }

  next();
});

module.exports = toDoRouter;
