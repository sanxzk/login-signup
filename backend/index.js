require("dotenv").config();
const express = require("express");
const { json } = require("express");
const cors = require("cors");
const connectToMongo = require("./Database/Database");

const app = express();
app.use(json());
app.use(cors());

connectToMongo();
const PORT = process.env.PORT || 5000;

app.use("/api/auth", require("./Routes/auth"));

app.use("/", (req, res) => {
  res.status(200).json({ success: true, endpoint: "home" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
