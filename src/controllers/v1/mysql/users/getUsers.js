const queryPromise = require("../../../../domains/mysql/queryPromise/mysqlQuery");

module.exports = async function(req, res, next) {
  let {user_id}  = req.params;
  let company_id = req.body.company_id;
  let query =
  `SELECT DISTINCT @i:=@i+1 AS row_index, u.user_id, ud.user_detail_id, u.work_status, u.connection_status, ud.name, 
   ud.lastname, ud.phone, ud.id_card, ud.gender, ud.birth_day, ud.profile_image, ud.email, u.last_activity_at, 
   ud.location_lat, ud.location_lng, ud.location_address, CONCAT(ud.name, ' ', ud.lastname) as fullname, u.user_key_cloak_id 
   FROM user_details ud left join  users u on ud.user_id = u.user_id 
   left join user_organization uo on u.user_id = uo.user_id 
   LEFT JOIN organization og on og.organization_id = uo.organization_id,  
  (SELECT @i:=0) AS r  
   where u.deleted='0' and uo.deleted ='0' and og.company_id = '${company_id}'`;
  
  if (user_id) {
    query += !isNaN(user_id)? ` and u.user_id ='${user_id}' `:` and u.user_key_cloak_id ='${user_id}' `;
  }
  query += " limit 500 ";
  console.log(query);
  const getResult = await queryPromise(query).catch(next);
  res.send(getResult);
};
