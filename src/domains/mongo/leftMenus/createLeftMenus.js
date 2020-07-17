const leftMenusModel = require("../../../models/mongo/leftMenus");
module.exports = async(req) =>{
    
    const addLeftMenus = await leftMenusModel.create(req);
    console.log(addLeftMenus);
    return addLeftMenus;
}