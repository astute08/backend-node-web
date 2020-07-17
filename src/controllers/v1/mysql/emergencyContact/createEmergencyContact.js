const createPromise = require("../../../../domains/mysql/queryPromise/mysqlCreate");
// {
//     "full_name": "",
//     "relation": "",
//     "phone":
//     "user_id":
//     "updated_by":""
// }
module.exports = async (req, res, next) =>{
    let date = new Date().toLocaleDateString().split("/");
    var year = date.splice(-1)[0];
    date.splice(0, 0, year);
    date = date.join("-");
    let query = "insert into emergency_contact (full_name, relation, phone, user_id, updated_by, updated_at) "+
    "values ('?', '?', ?, ?, ?,"+date+")";
    const data = req.body;
    let newData = [data.full_name, data.relation, data.phone, data.user_id, data.updated_by];
    const createResult = await createPromise(query,newData).catch(next);
    res.send(createResult)
}