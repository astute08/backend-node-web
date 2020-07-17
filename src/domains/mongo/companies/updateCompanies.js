const companiesModel = require("../../../models/mongo/companies");

module.exports = async(req) =>{
    const companyCode = req.companyCode;
    const id = await companiesModel.findOne({companyCode:companyCode});
    if(!id)return [];
    const updateCompanies = await companiesModel.findByIdAndUpdate({_id:id._id},req);
    return updateCompanies;

}