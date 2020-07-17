const updateCompanies = require("../../../../domains/mongo/companies/updateCompanies");

module.exports = async (req, res, next) =>{
    const updateResult = await updateCompanies(req.body).catch(next);
    res.send(updateResult);
} 