const deleteCompany = require("../../../../domains/mongo/companies/deleteCompanies");

module.exports = async(req, res, next) =>{
    const {companyCode} = req.params;
    const deleteResult = await deleteCompany(companyCode).catch(next);
    res.send(deleteResult);
}