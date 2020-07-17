const queryPromise = require("../../../../domains/mysql/queryPromise/mysqlQuery");
module.exports = async (req, res, next) => {
  const { user_org_id } = req.params;
  const query =
    "update user_organization set deleted ='1' WHERE  user_org_id = "+user_org_id;
  const deleteResult = await queryPromise(query).catch(next);
  res.send(deleteResult);
};
