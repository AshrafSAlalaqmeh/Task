const express = require("express");
const {
  addTask,
  updateTask,
  deleteTask,
  getTask,
  searchTasksByTitle,
} = require("../controllers/task");
const authentication = require("../middlewares/authentication");

const taskRouter = express.Router();

taskRouter.post("/", authentication, addTask);
taskRouter.put("/:id", authentication, updateTask);
taskRouter.delete("/:id", authentication, deleteTask);
// taskRouter.get("/:id", getTask);
taskRouter.get("/", getTask);
taskRouter.get("/search/task/:id", searchTasksByTitle);

module.exports = taskRouter;
