module.exports = (app) =>{
    app.get("/v1/mysql/companydocument/:organization_id", require("./getCompanyDocuments"));
    app.post("/v1/mysql/getuserdocuments",require("./getUserDocument"));
    app.post("/v1/mysql/create/companydoument",require("./createCompanyDocuments"));
    app.post("/v1/mysql/upload/document", require("./uploadDocument"));
}