module.exports =(app)=>{
    app.get("/v1/mysql/permissiongroups/:company_id?", require("./getPermissionGroup"));

}