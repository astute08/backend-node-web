const topMenusModel = require("../../../models/mongo/topMenus");
module.exports = async(companyCode)=>{
    let params = companyCode? {companyCode:companyCode}: undefined;
    const getResult = await topMenusModel.find(params);
    return getResult;
}