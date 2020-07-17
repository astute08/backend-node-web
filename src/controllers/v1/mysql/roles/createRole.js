const createPromise = require("../../../../domains/mysql/queryPromise/mysqlCreate");
const queryPromise = require("../../../../domains/mysql/queryPromise/mysqlQuery");
// {
//     "user_id": "id",
//     "permission_group_id": ["id",...]
// }
module.exports =async (req, res, next) =>{
    console.log(req.body);
    let date = new Date().toLocaleDateString().split("/");
    var year = date.splice(-1)[0];
    date.splice(0, 0, year);
    date = date.join("-");
    ///--------------- หา organization id มาใช้ insert
    const arrPermissionID = req.body.permission_group_id;
    let setPermissionID= "(";
    let queryGetMember = "SELECT m.member_id, m.organization_id, m.permission_group_id from `member` m left join users u where m.deleted = 0 and u.user_key_cloak_id = '"+req.body.user_id+"'";
    
    if(arrPermissionID.length > 0){
        for(let index=0; index < arrPermissionID.length ; index++){
            setPermissionID += index+1 < arrPermissionID.length ?
            arrPermissionID[index]+"," : arrPermissionID[index] ;
        }
        setPermissionID += ")";
        let findOrgID = "select organization_id, permission_group_id, permission_group_name  from permission_group where permission_group_id in "+setPermissionID;
        const organizationID = await queryPromise(findOrgID).catch(next);
        let arrResult = [];
        let hasReject = false;
    
        if(organizationID !== undefined ){
            let getRole = "SELECT m.user_id, m.member_id, pg.permission_group_id, pg.permission_group_name, "+
            "  m.organization_id FROM permission_group pg "+
            "left join `member` m on pg.permission_group_id = m.permission_group_id "+
            " left join users u on m.user_id = u.user_id where m.deleted = 0 "+
            " and u.user_key_cloak_id ='"+req.body.user_id+"'";
            const dataRoles = await queryPromise(getRole).catch(next);
            // console.log(dataRoles)
            // console.log(organizationID);
            if(dataRoles[0] !== undefined){
                let countDataInsert = organizationID.length;
                let countRoles = dataRoles.length;
                for(let index = 0; index < organizationID.length; index ++){
                    let orgId = organizationID[index].organization_id;
                    let permissId = organizationID[index].permission_group_id
                    for(let index2 = 0 ; index2 <  dataRoles.length; index2++){
                        if(dataRoles[index2].permission_group_id === permissId &&
                                dataRoles[index2].organization_id === orgId){
                                    // console.log(permissId+":"+dataRoles[index2].permission_group_id)
                                    // console.log(orgId+":"+dataRoles[index2].organization_id);
                                    // console.log(countRoles-1);
                                    countRoles = countRoles-1;
                                    countDataInsert = countDataInsert-1;
                            }
                    }
                }
                console.log(countRoles && countDataInsert);
                if(countRoles === 0 && countDataInsert ===0){
                    res.status(201).send({reject:"duplicated"})
                    return 0;
                }
            }
            

            
            for(let index = 0; index < organizationID.length; index ++){
                let orgId = organizationID[index].organization_id;
                let permissId = organizationID[index].permission_group_id
                if(orgId !== undefined){
                    ///------------ เช็คว่าข้อมูลซ้ำหรือป่าว--------------
                    let findDuplicate = "select m.member_id, m.deleted, u.user_id from `member` m left join users u on  where m.organization_id ="+orgId+
                        " and m.permission_group_id="+permissId+" and u.user_key_cloak_id= '"+req.body.user_id+"'";
                    const duplicated = await queryPromise(findDuplicate).catch(next);


                    let checkNoAct = "select member_id from `member` where member_id in ("
                    for(let index2 = 0; index2 < duplicated.length; index2++){
                        checkNoAct += index2+1 === duplicated.length ?
                            duplicated[index2].member_id+")": duplicated[index2].member_id+",";
                    }


                    ///--------------------------------------------
                    if(duplicated[0] === undefined){
                        let sql = "select user_id from users where  user_key_cloak_id = '"+req.body.user_id+"'";
                        let getID = await queryPromise(sql).catch(next);
                        if(getID[0] !== undefined){
                            let query = "insert into `member` (organization_id,permission_group_id, user_id) values (?, ?, ?)";
                            let newData = [orgId , permissId, getID[0].user_id];
                            const createResult = await createPromise(query,newData).catch(next);
                            arrResult = [...arrResult,{success: organizationID[index].permission_group_name} ];
                        }else{
                            hasReject = true;
                            arrResult = [...arrResult,{reject:"user id not found in the system"} ];
                        }
                        
                    }else{
                        let queryUpdate = "update `member` set deleted = '0'"+
                            " where organization_id ='"+orgId+"'"+
                            " and permission_group_id= '"+permissId+"'"+
                            " and user_id= '"+duplicated[0].user_id+"'";
                        let updateRole = await queryPromise(queryUpdate).catch(next);
                        arrResult = [...arrResult,{success: organizationID[index].permission_group_name} ];
                    }
                }else{
                    hasReject = true;
                    arrResult = [...arrResult, 
                        {reject:"permission: "+organizationID[index].permission_group_name+ " can  organization in this permission group"}];
                }
            }
        }
        
        // update to set deleted this item
        const getMember = await queryPromise(queryGetMember).catch(next);
        if(getMember !== undefined){
            for(let i = 0; i< getMember.length; i++){
                let hasRow = 0;
                for(let index = 0; index < organizationID.length; index ++){
                    if(getMember[i].organization_id === organizationID[index].organization_id &&
                        getMember[i].permission_group_id === organizationID[index].permission_group_id){
                            hasRow+=1;
                        }
                }
                if(hasRow === 0){
                    let update = "update `member` set deleted = '1', deleted_at = '"+date+"' "+
                        " where member_id = '"+getMember[i].member_id+"'";
                    const updateRole = await queryPromise(update).catch(next);
                }
            }
        }


        ////==================================
        if(hasReject){
            res.status(201).send(arrResult)
        }else{
            res.send(arrResult)
        }
    }else{
        // let queryGetMember = "SELECT member_id, organization_id, permission_group_id from `member` where deleted = 0 and user_id = '"+req.body.user_id+"'";
        const getMember = await queryPromise(queryGetMember).catch(next);
        if(getMember !== undefined){
            for(let i = 0; i< getMember.length; i++){
                let update = "update `member` set deleted = '1', deleted_at = '"+date+"' "+
                    " where member_id = '"+getMember[i].member_id+"'";
                const updateRole = await queryPromise(update).catch(next);
            }
        }
        res.status(202).send({success:"deleted all."})
    }  
    
}
