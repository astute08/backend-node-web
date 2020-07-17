const companiesModel = require("../../../models/mongo/companies");
module.exports = async (companyCode)=>{
    let params = companyCode? {companyCode: companyCode}: undefined;
    const getResult = await companiesModel.find(params);
    return getResult;
}