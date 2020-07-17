module.exports =(app)=>{
    app.get("/v1/mysql/roles/:company_id?/:user_id?", require("./getRoles"));
    app.post("/v1/mysql/create/role", require("./createRole"));
    app.delete("/v1/mysql/role/:member_id", require("./deleteRole"));
}