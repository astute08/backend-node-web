const queryPromise = require("../../../../domains/mysql/queryPromise/mysqlQuery");
// {
//     "permission_group_id":'id',
//     "user_id":'id',
//     "organization_id":'id'
// }
module.exports = async (req, res, next) =>{
    let date = new Date().toLocaleDateString().split("/");
    var year = date.splice(-1)[0];
    date.splice(0, 0, year);
    date = date.join("-");
    const {member_id} = req.params;
    let query = "update `member` set deleted = '1', deleted_at = '"+date+"' where member_id='"+member_id+"'";
    // "permission_group_id ="+req.body.permission_group_id+" and user_id ="+req.body.user_id+
    // " and organization_id="+req.body.organization_id;
    console.log(query);
    const deleteResult = await queryPromise(query).catch(next);
    res.send(deleteResult)
}