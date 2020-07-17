const queryPromise = require("../../../../domains/mysql/queryPromise/mysqlQuery");
// {
//     "keys":"",
//     "values":""
// }
module.exports = async (req, res, next) =>{
    console.log(req.body);
    if(req.body == undefined ){
        res.status(400).send("invalid syntax!");
        return 0;
    }
    const arrayKeys = req.body.keys.split(',');
    const arrVal = req.body.values.split(',')
    let query = "SELECT * , CONCAT(ud.name,' ',ud.lastname) as fullname, u.user_key_cloak_id "+
    "FROM users u left join user_details ud on ud.user_id = u.user_id left join user_organization uo on uo.user_id = u.user_id "+
    " left join organization og on uo.organization_id = og.organization_id";
    console.log(arrayKeys[0]);
    if(arrayKeys[0] !== ''){
        console.log("---------------------");
        query +=" where ";

        for(let index = 0; index < arrayKeys.length; index++){
            let table = String(arrayKeys[index])  == 'connection_status' ? "u.":
                String(arrayKeys[index])  == 'work_status' ? "u.": String(arrayKeys[index]) == 'last_activity_at' ? "u.":"ud.";
            //console.log(String(arrayKeys[index])  == 'work_status');
            if(arrayKeys[index] === "fullname"){
                let name =arrVal[index];
                query +="( ud.name like '%"+name+"%' or ud.lastname like '%"+name+"%' ) ";
                query += index+1 !== arrayKeys.length ? "": " "
            }else{
                query += index+1 === arrayKeys.length ? table+arrayKeys[index]+" like '%"+arrVal[index]+"%' ":
                table+arrayKeys[index]+" like '%"+arrVal[index]+"%' ";
            }
            
        }

        query += " and og.company_id = '"+req.body.company_id+"' and u.deleted='0' and uo.deleted ='0'";
    }else{
        console.log("VVVVVVVVVVVVVVVVVVVVVVVVV");
        console.log(arrayKeys,arrVal);
        query +=" where ";
        if(arrVal.length > 0  && arrVal[0] !== ""){
            query += "(";
            for(let index = 0; index < arrVal.length; index++){
                query += "ud.name like '%"+arrVal[index]+"%' or ";
                query += "ud.lastname like '%"+arrVal[index]+"%' or ";
                query += "CONCAT(ud.name,' ',ud.lastname) like '%"+arrVal[index]+"%' or ";  //CONCAT(ud.name,' ',ud.lastname) like '%albert Einstein%' or
                query += "ud.gender like '%"+arrVal[index]+"%' or  ";
                query += "ud.phone like '%"+arrVal[index]+"%'  or ";
                query += "ud.email like '%"+arrVal[index]+"%'  or ";
                query += "u.connection_status like '%"+arrVal[index]+"%'  or ";
                query += "u.work_status like '%"+arrVal[index]+"%'  or ";
                query += index+1 === arrVal.length ?  "u.last_activity_at like '%"+arrVal[index]+"%' ":
                "u.last_activity_at like '%"+arrVal[index]+"%' or ";
            }
            query += ") and ";
        }
        query += " og.company_id = '"+req.body.company_id+"' and u.deleted='0' and uo.deleted ='0'";
    }
    //u.deleted='0' and uo.deleted ='0' and og.company_id = '"+company_id+"'"
    
    console.log(query);
    const getResult = await queryPromise(query);
    res.send(getResult)
}