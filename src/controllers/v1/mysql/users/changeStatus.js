const queryPromise = require("../../../../domains/mysql/queryPromise/mysqlQuery");
// {
//     "user_id":"",
//     "work_status":""
// }
module.exports = async (req, res, next) =>{
    if(req.body == undefined ){
        res.status(400).send("invalid syntax!");
        return 0;
    }
    let user_id = req.body.user_id;
    let work_status = req.body.work_status;
    let query = "update `users` set work_status = "+work_status+" where user_id= '"+user_id+"'";
    console.log(query);
    const updateResult = await queryPromise(query).catch(next);
    res.send(updateResult);
}