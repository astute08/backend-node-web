const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String },
  email: { type: String },
  deleted: { type: Boolean }
});
const model = mongoose.model("User", schema);
module.exports = model;