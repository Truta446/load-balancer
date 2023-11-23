const express = require("express");

const app = express();

app.get("/app", (req, res) => {
  res.send(`Hello from server! Host: Beta`);
});

app.listen(3001, () => {
  console.log("Backend server running on port 3001");
});
