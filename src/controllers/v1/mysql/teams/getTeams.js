const queryPromise = require("../../../../domains/mysql/queryPromise/mysqlQuery");
module.exports = async (req, res, next) => {
  let query = "select og.organization_id, og.organization_name, uo.user_org_id, u.user_id from organization og "+
  "left join user_organization uo on og.organization_id = uo.organization_id "+
  "left join users u on uo.user_id = u.user_id ";
  const { user_id } = req.params;
  const {company_id} = req.params;
  if (company_id !== undefined) {
    query += ` where og.company_id = '${company_id}' `;
    if(user_id !== undefined){
      console.log(typeof user_id +"++"+user_id);
      query += !isNaN(user_id) ? `and u.user_id = '${user_id}'`: ` and u.user_key_cloak_id = '${user_id}' `;
    }
  }else{
    query += "where og.organization_id <> 'null' and u.user_id <> 'null' ";
  }
  query += " and uo.deleted = '0'";
  console.log(query);
  const getResult = await queryPromise(query).catch(next);
  res.send(getResult);
};
