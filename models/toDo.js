const mongoose = require("mongoose");

const toDoSchema = new mongoose.Schema({
  toDo: String,
  user: String,
});

const ToDo = mongoose.model("toDo", toDoSchema);

module.exports = ToDo;
