const companiesModel = require("../../../models/mongo/companies");
module.exports = async(companyCode) =>{
    const id =  await companiesModel.findOne({companyCode:companyCode});
    if(!id)return [];
    const deleteCompany = await companiesModel.findByIdAndRemove(id._id);
    return deleteCompany;
}