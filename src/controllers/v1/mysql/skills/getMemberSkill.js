const queryPromise = require("../../../../domains/mysql/queryPromise/mysqlQuery");
module.exports = async (req, res, next) =>{
    const {user_id} = req.params;
    const {company_id} = req.params;
    let query = "select distinct ms.member_skill_point_id, ms.member_id, s.skill_group_id, sg.skill_group_name, ms.member_skill_level "+
    "from member_skill ms left join skill s on ms.skill_id = s.skill_id "+
    "left join skill_group sg on s.skill_group_id = sg.skill_group_id "+
    "left join `member` m on m.member_id = ms.member_id "+
    "left join users u on u.user_id = m.user_id "+
    "left join user_organization uo on uo.user_id = u.user_id "+
    "left join organization og on og.organization_id = uo.organization_id ";
    
    if(user_id !== undefined && company_id !== undefined){
        
        query += !isNaN(user_id)? ` WHERE u.user_id = '${user_id}' `:` WHERE u.user_key_cloak_id='${user_id}' `;
        query +=` and og.company_id='${company_id}' `;
        // query += "WHERE u.user_key_cloak_id='"+user_id+"'";
    }

    // if(Object.keys(req.body).length > 0){
    //     query += "WHERE m.user_id='"+req.body.user_id+"' and m.organization = "+req.body.organization_id ;
    // }
    console.log( query );
    const getResult = await queryPromise(query).catch(next);
    res.send(getResult);
    
}