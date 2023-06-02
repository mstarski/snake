const express = require("express");
const { resolve } = require("path");

const port = process.env.PORT || 3000;
const app = express();

app.use(express.static(resolve(__dirname, "static")));

app.listen(port, () => {
  console.log(`App listening on port ${port} 🚚`);
  console.log(`http://localhost:${port}`);
});
