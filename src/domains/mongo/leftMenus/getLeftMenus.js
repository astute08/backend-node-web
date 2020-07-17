const leftMenusModel = require("../../../models/mongo/leftMenus");
module.exports =async (companyCode) =>{
    let params = companyCode ? {companyCode:companyCode}: undefined;
    const getResult = await leftMenusModel.find(params);
    return getResult;
}