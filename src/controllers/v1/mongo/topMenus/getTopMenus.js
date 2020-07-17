const getTopMenus = require("../../../../domains/mongo/topMenus/getTopMenus");
module.exports=async (req, res, next)=>{
    const {companyCode} = req.params;
    const getResult = await getTopMenus(companyCode).catch(next);
    res.send(getResult);
}