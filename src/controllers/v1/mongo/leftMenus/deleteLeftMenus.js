const deleteLeftMenus = require("../../../../domains/mongo/leftMenus/deleteLeftMenus");

module.exports = async(req, res, next) =>{
    const {companyCode} = req.params;
    const deleteResult = await deleteLeftMenus(companyCode).catch(next);
    res.send(deleteResult);
}