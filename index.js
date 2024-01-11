const express = require("express");
const { createTodoSchema, updateTodoSchema } = require("./types");
const { todo } = require("./db");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({
    "/create-todo": "Adds todo",
    "/get-todos": "shows all the todos present",
    "edit-todos": "marks the todo complete",
  });
});
app.post("/create-todo", async function (req, res) {
  const todoObj = req.body;
  const parsedTodoObj = createTodoSchema.safeParse(todoObj);

  if (!parsedTodoObj.success) {
    return res.status(404).json({ message: "You sent wrong inputs." });
  }
  await todo.create({
    title: todoObj.title,
    description: todoObj.description,
    completed: false,
  });
  res.json({ meassage: "Todo Created successfully" });
});

app.get("/get-todos", async function (req, res) {
  const todos = await todo.find({});
  res.json({ todos });
});

app.put("/edit-todos", async function (req, res) {
  const updatedObj = req.body;
  const parsedUpdatedObj = updateTodoSchema.safeParse(updatedObj);

  if (!parsedUpdatedObj.success) {
    return res.status(404).send({ message: "Sent wrong inputs" });
  }
  await todo.findOneAndUpdate(
    { _id: req.body.id },
    { $set: { completed: true } },
    { new: true } // If you want to get the updated document in the response
  );
});
app.listen(3000, (req, res) => {
  console.log("Server running on port 3000");
});
//create three routes one for putting todo, second for getting all todos and last for updating a todo
//create a types.js file for zod validation.
//put data in MongoDB{
