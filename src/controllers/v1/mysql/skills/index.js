module.exports =(app)=>{

    app.get("/v1/mysql/memberskill/:user_id?/:company_id?",require("./getMemberSkill"));

    app.get("/v1/mysql/skills/:company_id?",require("./getSkills"));

    app.post("/v1/mysql/create/skill",require("./createSkill"));
    app.post("/v1/mysql/create/memberskill",require("./createMemberSkill"));

    //app.put("/v1/mysql/update/memberskill", require("./updateMemberSkill"));
    //app.put("/v1/mysql/update/skillgroup",require("./updateSkill"));

    app.delete("/v1/mysql/memberskill/:member_skill_point_id",require("./deleteMemberSkill"));
}