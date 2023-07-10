const mongoose = require("mongoose");

const connectDb = (url) => {
  mongoose.set("strictQuery", true);

  mongoose
    .connect(url, {
      useNewUrlParser: true,
    })
    .catch()
    .then(() => console.log("MongoDB Connected"))
    .catch((error) => console.log(error));
};

module.exports = connectDb;
