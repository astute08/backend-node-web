const labelsModel = require("../../../models/mongo/labels");
 module.exports = async (companyCode)=>{
     let params = companyCode ? {companyCode:companyCode}: undefined;
     const getResult = await labelsModel.find(params);
     return getResult;
 }