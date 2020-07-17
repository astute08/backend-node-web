const getLeftMenus = require("../../../../domains/mongo/leftMenus/getLeftMenus");
module.exports = async(req, res, next) =>{
    const {companyCode} = req.params;
    const getResult = await getLeftMenus(companyCode).catch(next);
    res.send(getResult);
}