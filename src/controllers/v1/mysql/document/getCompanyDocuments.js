const queryPromise = require("../../../../domains/mysql/queryPromise/mysqlQuery");
module.exports = async (req, res, next) =>{
    const {organization_id} = req.params;
    let query = "select * from company_documents where organization_id = '"+organization_id+"'";
    const getResult = await queryPromise(query).catch(next);
    res.send(getResult);
}