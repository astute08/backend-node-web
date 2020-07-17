const queryPromise = require("../../../../domains/mysql/queryPromise/mysqlQuery");
module.exports = async (req, res, next) => {
  if (req.body.id === undefined) {
    res.send("Don't recieve ID value:'id'");
    return "";
  }
  let objKeys = Object.keys(req.body);
  let query = "UPDATE `teams` SET ";
  for (let index = 0; index < objKeys.length; index++) {
    if (objKeys[index] !== "id") {
      if (index + 1 < objKeys.length) {
        query += objKeys[index] + "='" + req.body[objKeys[index]] + "',";
      } else {
        query += objKeys[index] + "='" + req.body[objKeys[index]] + "' ";
      }
    }
  }
  query += "WHERE id =" + req.body.id;
  const updateResult = await queryPromise(query).catch(next);
  res.send(updateResult);
};
