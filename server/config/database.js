const mongoose = require("mongoose");
const { MONGOURI } = process.env;

exports.connect = () => {
  mongoose
    .connect(MONGOURI, { useNewUrlParser: true })
    .then(() => console.log("MongoDB successfully connected"))
    .catch((err) => {
      console.log("MonogoDB connection failed");
      console.error(err);
      process.exit(1);
    });
};
