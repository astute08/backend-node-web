const getCompanies = require("../../../../domains/mongo/companies/getCompanies");
module.exports = async (req, res, next) =>{
    const {companyCode} = req.params;
    const getResult = await getCompanies(companyCode).catch(next);
    res.send(getResult);
}