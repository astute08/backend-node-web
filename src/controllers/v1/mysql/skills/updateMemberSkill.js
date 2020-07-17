const queryPromise = require("../../../../domains/mysql/queryPromise/mysqlQuery");
module.exports = async (req, res, next)=>{
    if (req.body.member_skill_point_id === undefined) {
        res.send("Don't recieve ID value:'member_skill_point_id'");
        return "";
      }
      let objKeys = Object.keys(req.body);
      let query = "UPDATE `member_skill` SET ";
      for (let index = 0; index < objKeys.length; index++) {
        if (objKeys[index] !== "member_skill_point_id") {
          if (index + 1 < objKeys.length) {
            query += objKeys[index] + "='" + req.body[objKeys[index]] + "',";
          } else {
            query += objKeys[index] + "='" + req.body[objKeys[index]] + "' ";
          }
        }
      }
      query += "WHERE member_skill_point_id =" + req.body.member_skill_point_id;
      const updateResult = await queryPromise(query).catch(next);
      res.send(updateResult);
}