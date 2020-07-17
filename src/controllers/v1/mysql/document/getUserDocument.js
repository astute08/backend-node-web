const queryPromise = require("../../../../domains/mysql/queryPromise/mysqlQuery");
module.exports = async (req, res, next) =>{
    if(req.body == undefined ){
        res.status(400).send("invalid syntax!");
        return 0;
    }
    let checkID = !isNaN(req.body.user_id) ? `u.user_id ='${req.body.user_id}'`:u.user_key_cloak_id = '${req.body.user_id}';
    let query =` SELECT distinct cd.document_id, cd.document_name, cd.document_master_id, 
     cd.organization_id, ud.path,ud.user_id 
     FROM company_documents cd 
     left join users_documents ud ON cd.document_id = ud.document_id 
     left join users u on u.user_id = ud.user_id 
     left join organization og on og.organization_id = cd.organization_id 
     WHERE u.user_id ='${req.body.user_id}' and og.company_id = '${req.body.organization_id}'
     ORDER BY document_id `;
    console.log(query);
    const queryResult = await queryPromise(query).catch(next);
    res.send(queryResult);
}