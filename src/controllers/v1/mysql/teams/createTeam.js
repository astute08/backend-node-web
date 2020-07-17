const createPromise = require("../../../../domains/mysql/queryPromise/mysqlCreate");
const queryPromise = require("../../../../domains/mysql/queryPromise/mysqlQuery");
// {
//     "user_id":"",
//     "organization_id":""
// }
module.exports = async (req, res, next) => {
    let date = new Date().toLocaleDateString().split("/");
    var year = date.splice(-1)[0];
    date.splice(0, 0, year);
    date = date.join("-");

    let sqlCheckCompany =   ` select uo.* from user_organization uo LEFT JOIN users u 
                            on uo.user_id = u.user_id 
                            WHERE uo.organization_id = 
                                ( 
                                    select organization_id 
                                    from organization 
                                    where company_id = 
                                        (select og.company_id from organization og 
                                                LEFT JOIN user_organization uo 
                                                on og.organization_id = uo.organization_id 
                                                and og.organization_team = 'false' 
                                                where og.organization_id ='${req.body.organization_id}') 
                                    and organization_team = 'false' 
                                ) 
                            and (u.user_key_cloak_id = '${req.body.user_id}' or u.user_id ='${req.body.user_id}') `;
    console.log(sqlCheckCompany);
    const userIsinCompany = await queryPromise(sqlCheckCompany).catch(next);
    if(userIsinCompany[0] !== undefined){
        ///------------ เช็คว่าข้อมูลซ้ำหรือป่าว--------------
        let findDuplicate = 
        `SELECT DISTINCT uo.user_org_id, u.user_key_cloak_id,og.organization_name , og.organization_id, uo.deleted 
         FROM user_organization uo 
         left join users u on u.user_id = uo.user_id  
         left join organization og on og.organization_id = uo.organization_id  
         where (u.user_key_cloak_id = '${req.body.user_id }' or  u.user_id = '${req.body.user_id}') 
         and og.organization_id ='${req.body.organization_id}' `;

        const duplicated = await queryPromise(findDuplicate).catch(next);
        ///---------------------------------------------
        if (duplicated[0] === undefined) {
            let getIDUser = ` select user_id from users where user_key_cloak_id = '${req.body.user_id}' or user_id = '${req.body.user_id}' `;
            const userId = await queryPromise(getIDUser).catch(next);
            let getName = `select organization_name from organization where organization_id = '${req.body.organization_id}'`;
            const orgName = await queryPromise(getName).catch(next);
            if(userId[0] !== undefined && orgName[0] !== undefined){
                let sql ="insert into user_organization (user_id, organization_id, organization_name) "+
                    "values (?, ?, ?)";
                let newVal = [
                    userId[0].user_id,
                    req.body.organization_id,
                    orgName[0].organization_name
                //permissionResult[0].permission_group_id
                ];
                const createResult = await createPromise(sql, newVal).catch(next);
                res.send(createResult);
            }else{
                res.status(201).send({reject:"user_id or company_id don't found"});
            }
        } else {
                if(duplicated[0].deleted == 1){
                    let sql = "update user_organization set deleted = '0' where user_org_id = '"+duplicated[0].user_org_id+"'";
                    const updateResult = await queryPromise(sql).catch(next);
                    res.send(updateResult);
                }else{
                    res.status(201).send({reject:"duplicated"});
                }
        }
    }else{
        res.status(201).send({reject:"this user isn't in this company"});
    }
};
