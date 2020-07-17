const queryPromise = require("../../../../domains/mysql/queryPromise/mysqlQuery");
module.exports = async (req, res, next) =>{
    let user_id = req.body.keycloak_id;
    let query = "select uo.organization_id, uo.organization_name from user_organization uo "+
        " left join users u on u.user_id = uo.user_id where u.user_key_cloak_id = '"+user_id+"'";
    const getResult = await queryPromise(query).catch(next);
    res.send(getResult);
}