const toDoRouter = require("express").Router();

const User = require("../models/user");
const ToDo = require("../models/toDo");

toDoRouter.get("/todos", async (request, response, next) => {
  const username = request.headers.username;

  if (username) {
    const toDos = await ToDo.find({ user: username });
    return response.json(toDos);
  }

  next();
});

toDoRouter.get("/todos/:id", async (request, response, next) => {
  const username = request.headers.username;
  const id = request.params.id;

  if (username) {
    const toDo = await ToDo.findById(id);
    return response.json(toDo);
  }

  next();
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

toDoRouter.delete("/todos/:id", async (request, response, next) => {
  const username = request.headers.username;
  const id = request.params.id;

  if (username) {
    const toDo = await ToDo.findByIdAndDelete(id);
    return response.send(toDo);
  }

  next();
});

module.exports = toDoRouter;
