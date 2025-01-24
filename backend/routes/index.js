const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

//global variable of node js that represents the current file path
const pathRouter = `${__dirname}`;

const removeExtension = (filename) => {
  //split creates an array and then we will use shift to get first element, it will return only filename, no extension
  return filename.split(".").shift();
};

fs.readdirSync(pathRouter).filter((file) => {
  //read asynchronously only files that end with .js
  const fileWithOutExt = removeExtension(file);

  const skip = ["index"].includes(fileWithOutExt);

  if (!skip) {
    router.use(`/${fileWithOutExt}`, require(`./${fileWithOutExt}`));
  }
});

router.get("*", (req, res) => {
  res.status(404).json({ error: "route not found" });
});

module.exports = router;
