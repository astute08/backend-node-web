const leftMenusModel = require("../../../models/mongo/leftMenus");
module.exports = async(companyCode) =>{
    const id =  await leftMenusModel.findOne({companyCode: companyCode});
    if(!id)return [];
    const deleteLeftMenus = await leftMenusModel.findByIdAndRemove(id._id);
    return deleteLeftMenus;
}