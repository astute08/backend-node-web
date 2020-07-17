const createCompany = require("../../../../domains/mongo/companies/createCompanies");
module.exports = async (req, res, next) =>{
    const createResult = await createCompany(req.body).catch(next);
    res.send(createResult);
}