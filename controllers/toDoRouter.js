const toDoRouter = require("express").Router();
const ToDo = require("../models/toDo");

const jwt = require("jsonwebtoken");

toDoRouter.get("/todos/:user", async (request, response) => {
  const user = request.params.user;
  console.log(user);
  response.status(200).end();
});

toDoRouter.post("/todos", async (request, response) => {
  response.status(200).end();
});

module.exports = toDoRouter;
