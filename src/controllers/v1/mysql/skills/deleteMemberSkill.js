const queryPromise = require("../../../../domains/mysql/queryPromise/mysqlQuery");
module.exports = async (req, res, next) =>{
    const {member_skill_point_id} = req.params;
    const query = "DELETE FROM `member_skill` WHERE member_skill_point_id="+member_skill_point_id;
    const deleteResult = await queryPromise(query).catch(next);
    res.send(deleteResult);

}