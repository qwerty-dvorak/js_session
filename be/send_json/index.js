const express = require('express');
const app = express();

app.get('/', (req, res) => {
  // Send a JSON response
  res.json({
    message: "Hello World",
    status: "success",
    data: {
      items: [
        { id: 1, name: "Item 1" },
        { id: 2, name: "Item 2" },
        { id: 3, name: "Item 3" }
      ],
      count: 3
    }
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});