const express = require('express');
const app = express();

let items = [
  { id: 1, name: "Item 1" },
  { id: 2, name: "Item 2" }
];

app.get('/items', (req, res) => {
  res.json(items);
});

app.post('/items', (req, res) => {
  const newItem = {
    id: items.length + 1,
    name: req.body.name
  };
  items.push(newItem);
  res.status(201).json(newItem);
});

app.put('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const itemIndex = items.findIndex(item => item.id === id);
  
  if (itemIndex === -1) {
    return res.status(404).json({ message: "Item not found" });
  }
  
  items[itemIndex] = {
    id: id,
    name: req.body.name
  };
  
  res.json(items[itemIndex]);
});

app.delete('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const itemIndex = items.findIndex(item => item.id === id);
  
  if (itemIndex === -1) {
    return res.status(404).json({ message: "Item not found" });
  }
  
  const deletedItem = items[itemIndex];
  items = items.filter(item => item.id !== id);
  
  res.json({ message: "Item deleted", item: deletedItem });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});