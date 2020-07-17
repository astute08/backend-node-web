const mongoose = require("mongoose");
const schema = new mongoose.Schema({
    languageCode:{type:String, required:true, unique:true },
    languageDisplay:{type:String, required:true}
});
const model = mongoose.model("Languages", schema);
module.exports = model;