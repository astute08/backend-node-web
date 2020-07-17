const mongoose = require("mongoose");

const schema =new mongoose.Schema({
    companyCode:{type:String, required:true, unique:true},
    languages:{}
});
const model = mongoose.model("LeftMenus", schema);
module.exports = model;