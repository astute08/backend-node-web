const createPromise = require("../../../../domains/mysql/queryPromise/mysqlCreate");
module.exports = async (req, res,next) => {
    const date = Date.now();
    let query = "insert into skill_group (`skill_group_name`, `skill_group_status`, `organization_id`) "+
    "values (?, 1, ?)";
    let arrResult = [];
    const newSkillGroup = [req.body.skill_group_name, req.body.organization_id];
    let createResult = await createPromise(query,newSkillGroup).catch(next); // เพิ่มทักษะใหม่ใน table skill_group
    arrResult += [...arrResult,createResult];
    if(createResult.affectedRows > 0 && createResult.insertId > 0){ // เช็คว่าเพิ่มข้อมูลสำเร็จหรือไม่
        query = "insert into skill (`skill_group_id`) values (?)";
        // หลังจากเพิ่มทักษะใหม่ลงใน skill_group แล้วนำ skill_group_id มาผูก foreign key ของ table skill
        createResult = await createPromise(query,[createResult.insertId]).catch(next);
        arrResult += [...arrResult,createResult];
    }

    res.send(createResult);
}