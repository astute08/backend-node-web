const topMenusModel = require("../../../models/mongo/topMenus");
module.exports = async(tagName) =>{
    const id =  await topMenusModel.findOne({tagName: tagName});
    console.log(id);
    if(!id)return [];
    const deleteTopMenus= await topMenusModel.findByIdAndRemove(id._id);
    return deleteTopMenus;
}