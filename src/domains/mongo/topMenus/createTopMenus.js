const topMenusModel = require("../../../models/mongo/topMenus");

module.exports = async (req) =>{
    const addTopMenus = await topMenusModel.create(req);
    return addTopMenus;
}