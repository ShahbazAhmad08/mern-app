const mongoose = require("mongoose");
const Mongo_url = process.env.MONGO_CONN;

mongoose
  .connect(Mongo_url)
  .then(() => {
    console.log("mongo connected...");
  })
  .catch((err) => {
    console.error("mongo connection error", err);
  });
