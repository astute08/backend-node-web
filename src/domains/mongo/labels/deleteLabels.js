const labelsModel = require("../../../models/mongo/labels");
module.exports = async(tagName) =>{
    const id =  await labelsModel.findOne({tagName: tagName});
    console.log(id);
    if(!id)return [];
    const deleteLabels = await labelsModel.findByIdAndRemove(id._id);
    return deleteLabels;
}