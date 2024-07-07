const toDoRouter = require("express").Router();
const ToDo = require("../models/toDo");

toDoRouter.get("/todos/:user", async (request, response) => {
  const user = request.params.user;
  console.log(user);
  response.status(200).end();
});

module.exports = toDoRouter;
