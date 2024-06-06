const express = require('express');
const app = express();
const port = 5000;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

let items = [
    { "id": 1, "name": "Nike Air Max", "size": "US Men's 9" },
    { "id": 2, "name": "Adidas Ultraboost", "size": "US Women's 8" },
    { "id": 3, "name": "Jordan 1 Retro High", "size": "Men's US 10.5" },
    { "id": 4, "name": "Yeezy Boost 350 V2", "size": "Women's US 6" },
    { "id": 5, "name": "New Balance 574", "size": "Men's US 11" },
    { "id": 6, "name": "Puma Ralph Sampson Mid", "size": "Women's US 7.5" },
    { "id": 7, "name": "Reebok Club C", "size": "Men's US 8.5" },
    { "id": 8, "name": "Converse Chuck Taylor All Star", "size": "Women's US 5" },
    { "id": 9, "name": "Vans Sk8-Hi", "size": "Men's US 9.5" },
    { "id": 10, "name": "Skechers D'Lites", "size": "Women's US 6.5" },
]; // Our "database"

// Get all items
app.get('/api/data', (req, res) => {
  res.json(items);
});

// Add an item
app.use(express.json()); // Middleware to parse JSON bodies
app.post('/api/data', (req, res) => {
  const newItem = req.body;
  items.push(newItem);
  res.status(201).json(newItem);
});

// Update an item
app.put('/api/data/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const updatedItem = req.body;
  const itemIndex = items.findIndex(item => item.id === itemId);

  if (itemIndex!== -1) {
    items[itemIndex] = updatedItem;
    res.json(updatedItem);
  } else {
    res.status(404).send('Item not found');
  }
});

// Delete an item
app.delete('/api/data/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const itemIndex = items.findIndex(item => item.id === itemId);

  if (itemIndex!== -1) {
    const deletedItem = items.splice(itemIndex, 1)[0];
    res.json(deletedItem);
  } else {
    res.status(404).send('Item not found');
  }
});
