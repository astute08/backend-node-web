const queryPromise = require("../../../../domains/mysql/queryPromise/mysqlQuery");
module.exports = async (req, res, next) =>{
    let query = "SELECT * FROM emergency_contact ";
    let {user_id} = req.params;
    if(user_id !== undefined){
        query += ` where user_id = '${user_id}'`;
    }
    const getResult = await queryPromise(query).catch(next);
    res.send(getResult);
}