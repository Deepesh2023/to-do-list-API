const toDoRouter = require("express").Router();
const ToDo = require("../models/toDo");

const jwt = require("jsonwebtoken");

toDoRouter.get("/todos/:user", async (request, response) => {
  const user = request.params.user;
  console.log(user);
  response.status(200).end();
});

toDoRouter.post("/todos", async (request, response) => {
  let token = request.headers.authorization;
  if (token) {
    if (token.startsWith("Bearer ")) {
      token = token.replace("Bearer ", "");
      const user = jwt.verify(token, process.env.JWT_KEY);
      return response.json(user);
    }
  }

  response.status(401).end();
});

module.exports = toDoRouter;
