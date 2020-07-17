const queryPromise = require("../../../../domains/mysql/queryPromise/mysqlQuery");
module.exports = async (req, res, next) =>{
    try{
        let date = new Date().toLocaleDateString().split("/");
        var year = date.splice(-1)[0];
        date.splice(0, 0, year);
        date = date.join("-");
        let user_key_cloak_id = req.body.user_id; 
        let company_id = req.body.company_id; 
        let query = "SELECT *  from users u "+
        " left join user_details ud on u.user_id = ud.user_id "+
        " left join user_organization uo on u.user_id = uo.user_id "+
        " LEFT JOIN organization og "+
        " on uo.organization_id = og.organization_id "+
        " where u.user_key_cloak_id = '"+user_key_cloak_id+"' and og.company_id = '"+company_id+"'";
        const getResult = await queryPromise(query).catch(next);

        query = "update users set last_activity_is = 'Login to wfm system', last_activity_at ='"+date+"', "+
            " company_login = '"+company_id+"' where user_key_cloak_id = '"+user_key_cloak_id+"'";
        const updateActivity = await  queryPromise(query).catch(next);

        res.send(getResult);
    }catch(e){
        console.log("ERROR :",e);
        res.status(400).send(e)
    }
}