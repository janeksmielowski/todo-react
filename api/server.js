var express = require("express");
var { v4: uuid } = require("uuid");

var port = 4000;

var app = express();
app.use(express.json());

var db = {
  todos: [
    { id: '29242699-5914-4a00-b1ac-1e0113a7a802', text: 'Do the shopping', done: false },
    { id: '728785f1-010a-4870-9e91-9823aec75b40', text: 'Go to the gym', done: false },
    { id: '9665821d-eaf4-41e7-98cb-e15a10fa096c', text: 'Learn for the exam', done: false },
  ] 
};

// function sleep(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

app.get("/api/todos", async (req, res) => {
  // await sleep(1000);

  res.json(db.todos);
});

app.get("/api/todos/:todo_id", async (req, res) => {
  // await sleep(1000);

  if (!req.params.todo_id) {
    res.status(400).json({ error: "Todo id is required" });
    return;
  }

  var todo = db.todos.find(todo => todo.id === req.params.todo_id);

  if (!todo) {
    res.status(404).send("Todo not found");
  }

  res.json(todo)
});

app.post("/api/todos", async (req, res) => {
  // await sleep(1000);

  if (!req.body || req.body.text === "") {
    res.status(400).send("Todo text cannot be empty");
    return;
  }

  db.todos.push({
    id: uuid(),
    text: req.body.text,
    done: false
  });

  res.json(db.todos);
});

app.put("/api/todos/:todo_id", async (req, res) => {
  // await sleep(1000);

  if (!req.params.todo_id) {
    res.status(400).json({ error: "Todo id is required" });
    return;
  }

  if (!req.body || req.body.text === "") {
    res.status(400).send("Todo text cannot be empty");
    return;
  }

  var todoIndex = db.todos.findIndex(todo => todo.id === req.params.todo_id);
  if (todoIndex === -1) {
    res.status(404).send("Todo not found");
    return;
  }

  var todo = db.todos[todoIndex];
  if (req.body.text && req.body.text !== "") {
    todo.text = req.body.text;
  }

  if (req.body.done !== undefined) {
    todo.done = req.body.done;
  }

  db.todos[todoIndex] = todo;
  res.json(db.todos);
});

app.delete("/api/todos/:todo_id", async (req, res) => {
  // await sleep(1000);

  db.todos = db.todos.filter(todo => todo.id !== req.params.todo_id);
  res.status(200).send("Todo deleted");
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
