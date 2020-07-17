const queryPromise = require("../../../../domains/mysql/queryPromise/mysqlQuery");
// {
// 	"user_id":"2",
// 	+ ค่าที่อย่างแก้ไข
// }
//{
// 	"user_id":"2",
// 	"location_lat":"",
//  "location_lng":""
//}
module.exports = async (req, res, next) =>{
    if(req.body == undefined ){
        res.status(400).send("invalid syntax!");
        return 0;
    }
    const arrayKeys = Object.keys(req.body);        
    let query = "update user_details set ";
    if(arrayKeys.length > 0){
        for(let index = 0; index < arrayKeys.length; index++){
            if( arrayKeys[index] !== "user_id"){
                query += index+1 === arrayKeys.length ? arrayKeys[index]+" = '"+req.body[arrayKeys[index]]+"' ":
                    arrayKeys[index]+" = '"+req.body[arrayKeys[index]]+"', ";
            }
        }
        query += " where user_id= '"+ req.body.user_id+"'";
    }
    const updateResult = await queryPromise(query).catch(next);
    res.send(updateResult);
}