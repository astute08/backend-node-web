const mongoose = require("mongoose");
//const g = require("./languages");
const schema = new mongoose.Schema({
    companyCode:{type: String, required: true, unique: true},
    companyName:{type: String, required:true, unique:true},
    //language:{type:Object}
});
const model = mongoose.model("Companies", schema);
module.exports = model;