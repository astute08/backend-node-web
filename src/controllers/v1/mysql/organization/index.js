module.exports =(app)=>{
    app.get("/v1/mysql/organizations/:company_id?",require("./getOrganization"));
    app.post("/v1/mysql/userorganization", require("./getUserOrganization"));
}