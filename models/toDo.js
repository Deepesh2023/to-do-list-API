const mongoose = require("mongoose");

const toDoSchema = new mongoose.Schema({
  toDo: String,
  user: String,
  isDone: Boolean,
});

const ToDo = mongoose.model("toDo", toDoSchema);

module.exports = ToDo;
