// for push data to selected element in add team modal 
const queryPromise = require("../../../../domains/mysql/queryPromise/mysqlQuery");
module.exports = async (req, res, next) =>{
    let {company_id} = req.params;
    let query = "SELECT * FROM organization ";
    if(company_id !== undefined){
        query += "WHERE company_id = '"+company_id+"' and company_id <> 'null' and organization_team <> 'false' ";
    }
    const getResult = await queryPromise(query).catch(next);
    res.send(getResult)
}