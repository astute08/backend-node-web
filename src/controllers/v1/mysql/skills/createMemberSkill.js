const createPromise = require("../../../../domains/mysql/queryPromise/mysqlCreate");
const queryPromise = require("../../../../domains/mysql/queryPromise/mysqlQuery");
module.exports = async (req, res, next) => {
  let date = new Date().toLocaleDateString().split("/");
  var year = date.splice(-1)[0];
  date.splice(0, 0, year);
  date = date.join("-");
  // หา member id จาก user and skill ที่ส่งเข้ามา เพื่อเช็คว่า user คนนั้นเป็นสมาชิกของ organization ใด
  let sqlGetMemberID =
    "select DISTINCT m.member_id, m.user_id, m.organization_id from `member` m " +
    //"left join organization og on og.organization_id = m.organization_id " +
    "left join skill_group sg on m.organization_id = sg.organization_id " +
    "left join skill s on sg.skill_group_id = s.skill_group_id " +
    "left join users u on u.user_id = m.user_id "+
    "where s.skill_id = '" +req.body.skill_id +"'";
    sqlGetMemberID += !isNaN(req.body.user_id)? `and u.user_id = '${req.body.user_id}'`:` and u.user_key_cloak_id ='${req.body.user_id}'`;
 //-----------------------------------------------------------------------------------
console.log(sqlGetMemberID);
  const getMemberID = await queryPromise(sqlGetMemberID).catch(next);
  if (getMemberID[0] !== undefined) {
        ///------------ เช็คว่าข้อมูลซ้ำหรือป่าว--------------
        let findDuplicate =
        "select 1 as found from member_skill where member_id =" +
        getMemberID[0].member_id +
        " and skill_id=" +
        req.body.skill_id;
        const duplicated = await queryPromise(findDuplicate).catch(next);
        console.log(duplicated);
        ///--------------------------------------------
        if (duplicated[0] === undefined) {
            const query =
            "insert into member_skill (member_id, skill_id, member_skill_level, create_at) values (?, ?, ?,'"+date +"')";
            let newMemberSkill = [
                getMemberID[0].member_id,
                req.body.skill_id,
                req.body.member_skill_level
            ];
            const createResult = await createPromise(query, newMemberSkill).catch(next);
            res.send(createResult);
        } else {
            res.send({ reject: "duplicated" });
        }
  }else{
    res.send({ reject: "no organization in members" });
  }
};
