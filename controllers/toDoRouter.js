const toDoRouter = require("express").Router();

const User = require("../models/user");
const ToDo = require("../models/toDo");

toDoRouter.post("/todos", async (request, response, next) => {
  const toDo = request.body;

  const userInDB = await User.findOne({ username: toDo.user });
  if (userInDB) {
    const newToDo = new ToDo({
      ...toDo,
      isDone: false,
    });

    const newToDoInDB = await newToDo.save();
    return response.json(newToDoInDB);
  } else {
    response.status(400).end();
  }

  next();
});

toDoRouter.get("/todos", async (request, response, next) => {
  const username = request.body.user;

  if (username) {
    const toDos = await ToDo.find({ user: username });
    return response.json(toDos);
  }

  next();
});

toDoRouter.get("/todos/:id", async (request, response, next) => {
  const username = request.body.user;
  const id = request.params.id;

  if (username) {
    const toDo = await ToDo.findById(id);
    return response.json(toDo);
  }

  next();
});

toDoRouter.put("/todos/:id", async (request, response, next) => {
  const toDo = request.body;
  const id = request.params.id;

  if (toDo.user) {
    const updatedToDo = await ToDo.findByIdAndUpdate(id, toDo, {
      returnDocument: "after",
    });
    return response.send(updatedToDo);
  }

  next();
});

toDoRouter.delete("/todos/:id", async (request, response, next) => {
  const username = request.body.user;
  const id = request.params.id;

  if (username) {
    const toDo = await ToDo.findByIdAndDelete(id);
    return response.send(toDo);
  }

  next();
});

module.exports = toDoRouter;
