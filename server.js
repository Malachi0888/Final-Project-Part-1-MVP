const express = require('express');
const app = express();
app.use(express.json());

let items = [];

// GET
app.get('/items', (req, res) => {
  res.json(items);
});

// POST
app.post('/items', (req, res) => {
  const item = req.body;
  items.push(item);
  res.status(201).json(item);
});

// PUT
app.put('/items/:id', (req, res) => {
  const id = req.params.id;
  items[id] = req.body;
  res.json(items[id]);
});

// DELETE
app.delete('/items/:id', (req, res) => {
  items.splice(req.params.id, 1);
  res.json({ message: "Deleted" });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
