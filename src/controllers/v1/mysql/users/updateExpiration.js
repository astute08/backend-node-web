const queryPromise = require("../../../../domains/mysql/queryPromise/mysqlQuery");
module.exports = async (req, res, next) =>{
    if(req.body == undefined ){
        res.status(400).send("invalid syntax!");
        return 0;
    }
    let query = "update users set expiration = "+req.body.expiration +" where user_id = '"+req.body.user_id+"'";
    const updateResult = await queryPromise(query).catch(next);
    res.send(updateResult);
 }