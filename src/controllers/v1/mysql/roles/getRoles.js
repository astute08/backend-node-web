const queryPromise = require("../../../../domains/mysql/queryPromise/mysqlQuery");
module.exports = async (req, res, next)=>{
    /*let query = "SELECT m.user_id, m.member_id, pg.permission_group_id, pg.permission_group_name, "+
    "  m.organization_id FROM permission_group pg "+
    "inner join KG_WFM_DEV.member m on pg.permission_group_id = m.permission_group_id "+
    " left join users u on u.user_id = m.user_id "+
    " left join organization og on og.organization_id = m.organization_id "+
    " where m.deleted = 0";
    let {user_id} = req.params;
    let {company_id} = req.params;
    // if(user_id !== undefined ){
        query += " and u.user_key_cloak_id ='"+user_id+"' and og.company_id ='"+company_id+"'";
    // }
    // console.log(query);*/

    // let orgId = req.params.company_id;
    let userId = req.params.user_id;
    


    let memId = 218;
    let orgId = 1;

    let query = `SELECT mpg.mem_per_gro_id, pg.permission_group_id, pg.permission_group_name 
                FROM \`member_permission_group\` mpg
                LEFT JOIN \`permission_group\` pg ON (mpg.per_gro_id = pg.permission_group_id)
                LEFT JOIN \`member\` m ON (mpg.mem_id = m.member_id)
                WHERE mpg.deleted = '0' AND mpg.mem_id = '${memId}' AND pg.organization_id = '${orgId}' `;
    console.log(query);
    const getResult = await queryPromise(query).catch(next);
    res.send(getResult);
}