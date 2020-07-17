const queryPromise = require("../../../../domains/mysql/queryPromise/mysqlQuery");
module.exports = async (req, res, next) =>{
    const {contact_id}=req.params;
    let query = "delete emergency_contact where contact_id="+contact_id;
    const deleteResult = await queryPromise(query).catch(next);
    res.send(deleteResult);
}