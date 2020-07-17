const getLabels = require("../../../../domains/mongo/labels/getLabels");

module.exports = async(req, res, next)=>{
    const {companyCode} = req.params;
    const getResult = await getLabels(companyCode).catch(next);
    res.send(getResult);
}