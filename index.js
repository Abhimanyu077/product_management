require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());
require("./config/modelConfig");
const router = require("./routes/productRouter");

HOST = "https://localhost:";
PORT = process.env.PORT || 9001;

app.use("/", router);
PORT = 7000 || 8000;

app.listen(PORT, (req, res) => {
  console.log(`Server is running on ${HOST}${PORT}`);
});
