const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: String,
  userId: String,
  name: String,
  email: String,
  photo: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
