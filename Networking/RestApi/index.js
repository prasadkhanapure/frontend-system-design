import express from "express";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());

app.all("/", (req, res) => {
  res.send(`I'm up!`);
});

const todos = [
  {
    id: 1,
    title: "Task 1",
    completed: false,
  },
  {
    id: 2,
    title: "Task 2",
    completed: true,
  },
];

// READ
app.get("/todos", (req, res) => {
  res.json(todos);
});

// CREATE
app.post("/todos", (req, res) => {
  const newTodo = req.body;
  if (!newTodo.id) {
    return res.status(401).json({
      message: "Id is required field",
    });
  }

  const todoIndex = todos.findIndex(
    (td) => Number(td.id) === Number(newTodo.id),
  );

  if (todoIndex === -1) {
    todos.push(newTodo);
    res.status(201).json({
      message: "New Todo created!",
    });
  } else {
    res.status(409).json({
      message: `Todo list with ${newTodo.id} is already existed.`,
    });
  }
});

// UPDATE
app.put("/todos/:id", (req, res) => {
  const newTodo = req.body;
  const todoParamsId = req.params.id;
  const todoIndex = todos.findIndex(
    (item) => Number(item.id) === Number(todoParamsId),
  );

  if (todoIndex !== -1) {
    todos[todoIndex] = {
      id: todoParamsId,
      ...newTodo,
    };
    res.json({
      message: `Todo at id: ${todoParamsId} updated successfully!`,
    });
  } else {
    res.status(400).json({
      message: "No item found!",
    });
  }
});

// DELETE Single ID from Todo list
app.delete("/todos/:id", (req, res) => {
  const todoParamId = req.params.id;
  const todoIndex = todos.findIndex(
    (td) => Number(td.id) === Number(todoParamId),
  );

  if (todoIndex !== -1) {
    todos.splice(todoIndex, 1);
  }

  res.json({
    message: "Todo deleted successfully!",
  });
});

// DELETE ALL todos list
app.delete("/todos", (req, res) => {
  todos.length = 0;
  return res.status(200).json({
    message: "All todos deleted",
    todos,
  });
});

const PORT = 5113;
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
