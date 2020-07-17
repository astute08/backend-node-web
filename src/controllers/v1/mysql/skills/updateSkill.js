const queryPromise = require("../../../../domains/mysql/queryPromise/mysqlQuery");
module.exports= async (req, res, next) =>{
    // แก้ไข skill_group_status ของ skill_group เป็น 0 หรือ 1
    if (req.body.skill_group_id === undefined) {
        res.send("Don't recieve ID value:'skill_group_id'");
        return "";
      }
      let objKeys = Object.keys(req.body); // ดึงชื่อ column ทั้งหมดจาก table มาเก็บเป็น array
      let query = "UPDATE `skill_group` SET "; 
      for (let index = 0; index < objKeys.length; index++) {  // looping array column name เพื่อนำเชื่อมาแมพับ
        if (objKeys[index] !== "skill_group_id") {
          if (index + 1 < objKeys.length) {
            query += objKeys[index] + "='" + req.body[objKeys[index]] + "',";
          } else {
            query += objKeys[index] + "='" + req.body[objKeys[index]] + "' ";
          }
        }
      }
      query += "WHERE skill_group_id =" + req.body.skill_group_id;
      const updateResult = await queryPromise(query).catch(next);
      res.send(updateResult);
}