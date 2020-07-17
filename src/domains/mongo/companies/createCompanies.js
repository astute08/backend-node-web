const companiesModel = require("../../../models/mongo/companies");
module.exports = async (req) =>{
    const addCompanies = await companiesModel.create(req);
    return addCompanies;
}