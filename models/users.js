const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  date: Date,
});

const User = mongoose.model("users", userSchema);

module.exports = User;
