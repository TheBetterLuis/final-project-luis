const mongoose = require("mongoose");

const dbConnect = () => {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log("Connection successful with database");
    })
    .catch((error) => {
      console.error("Error connecting with database");
    });
};

module.exports = { dbConnect };
