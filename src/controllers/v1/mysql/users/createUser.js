const createPromise = require("../../../../domains/mysql/queryPromise/mysqlCreate");
const queryPromise = require("../../../../domains/mysql/queryPromise/mysqlQuery");
module.exports = async (req, res, next) =>{
    if(req.body == undefined ){
        res.status(400).send("invalid syntax!");
        return 0;
    }
    let date = new Date().toLocaleDateString().split("/");
    var year = date.splice(-1)[0];
    date.splice(0, 0, year);
    date = date.join("-");

    let query = "insert into users (user_id, expiration, last_activitie_at) values (?, ?, ?)";
    let newData = [req.body.user_id, req.body.expiration, date];
    let createResult = await createPromise(query,newData).catch(next);
    console.log(createResult)
    console.log("affectedRows: ",createResult.affectedRows);
    console.log("serverStatus: ",createResult.serverStatus);
    if(createResult.affectedRows === 1 
        && createResult.serverStatus === 2)
        {
            query = "insert into user_details ";
            const userDrtail = req.body.user_details
            const arrayKeys = Object.keys(userDrtail);
            let setCOl = "(user_id, update_at, "
            let values = "values ('"+req.body.user_id+"', '"+date+"',";
            if(arrayKeys.length > 0){
                for(let index = 0; index < arrayKeys.length; index++){
                    setCOl += index+1 <  arrayKeys.length ?
                        arrayKeys[index]+",": arrayKeys[index];
                    values += index+1 <  arrayKeys.length ?
                        "'"+userDrtail[arrayKeys[index]]+"', ": "'"+userDrtail[arrayKeys[index]]+"'";
                }
                setCOl += " ) ";
                values += " ) ";
                query+= setCOl+values;
                createResult = await queryPromise(query).catch(next);
                res.send(createResult);
            }else{
                res.status(201).send({reject:"no data user details."})
            }
        }else(
            res.status(500).send({reject:"create user failed."})
        )
}
// {
//     "user_id":"",
//     "expiration":"",
//     "user_details":
//     {
//         "username":""
//         ,"password":""
//         , "name":""
//         , "lastname":""
//         , 'phone':""
//         , "id_card":""
//         , "gender":""
//         , "birth_day":"" 
//         ,"profile_image":""
//         , "email":""
//         , "location_lat":""
//         , "location_lng":""
//     }
// }