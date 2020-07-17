const queryPromise = require("../../../../domains/mysql/queryPromise/mysqlQuery");
module.exports = async (req, res,next) => {
    //const {user_id} = req.params;
    const {company_id}=req.params;
    let query = `select distinct s.skill_id, sg.skill_group_id, sg.skill_group_name, 
     sg.skill_group_status, og.organization_id  from skill s 
     left join skill_group sg on s.skill_group_id = sg.skill_group_id 
     left join organization og on sg.organization_id = og.organization_id 
     left join user_organization uo on og.organization_id = uo.organization_id 
     left join users u on u.user_id = uo.user_id `;
    
    if(company_id !== undefined){
        query += ` where og.company_id = '${company_id}' `;
    }
    // if(user_id !== undefined){
    //     //query += " where u.user_key_cloak_id = '"+user_id+"'";
        
    // }
    console.log(query);
    const getResult = await queryPromise(query).catch(next);
    res.send(getResult);
}
