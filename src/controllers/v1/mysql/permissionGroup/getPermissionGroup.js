const queryPromise = require("../../../../domains/mysql/queryPromise/mysqlQuery");

module.exports = async(req, res, next)=>{
    let query = "SELECT p.* FROM permission_group  p left join organization og on og.organization_id = p.organization_id";
    
    query += " where p.deleted = '0' and og.organization_team = 'false' ";
    let {company_id} = req.params;
    if(company_id !== undefined ){
        query += " and og.company_id = '"+company_id+"'"; 
    }
    query +=  " order by p.permission_group_name"
    console.log(query);
    const getResult = await queryPromise(query).catch(next);
    res.send(getResult);
}