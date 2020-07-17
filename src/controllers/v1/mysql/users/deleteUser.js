const queryPromise = require("../../../../domains/mysql/queryPromise/mysqlQuery");
module.exports = async (req, res, next) => {
    let date = new Date().toLocaleDateString().split("/");
    var year = date.splice(-1)[0];
    date.splice(0, 0, year);
    date = date.join("-");
    let userId = req.body.user_id;
    let companyId = req.body.company_id;
    let query = "SELECT u.user_id, og.organization_id from organization og "+ 
        " INNER JOIN user_organization uo "+
        " on og.organization_id = uo.organization_id "+
        " INNER JOIN users u "+
        " on uo.user_id = u.user_id "+
        " where u.user_key_cloak_id = '"+userId+"' and og.company_id = '"+companyId+"'";
    const getId = await queryPromise(query).catch(next);
    console.log(getId);
    if(getId.length > 0){
        query = "update user_organization set deleted = '1', deleted_at = '"+date+"' where user_id='"+getId[0].user_id+"' and organization_id ='"+getId[0].organization_id+"'";
        console.log(query);
        const updateResult = await queryPromise(query).catch(next);
        if(updateResult.affectedRows !== 0){
            res.send({success:"delete user success."});
            return "success";
        }
    }
    res.status(400).send({reject:"delete failed."});
}