const mongoose = require("mongoose");
const schema = new mongoose.Schema({
    companyCode:{type:String, required:true, unique:true},
    languages:{}
});
const  model = mongoose.model("labels", schema);

module.exports = model;