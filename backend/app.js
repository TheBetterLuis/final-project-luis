//require dotenv to use variables
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const { dbConnect } = require("./config/mongo");

dbConnect();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

//app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/", require("./routes"));
app.listen(PORT, () => {
  console.log("api is ready");
  console.log(`Server running on port ${PORT}`);
});
