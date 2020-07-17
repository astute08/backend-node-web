// แยก ไฟล์ index แต่ละ folder
module.exports = function (app) {
    // api get
    app.get("/v1/mongo/companies/:companyCode?", require("./getCompanies"));

    // api create 
    app.post("/v1/mongo/create/companies", require("./createCompanies"));

    // api delete
    app.delete("/v1/mongo/delete/companies/:companyCode",require("./deleteCompanies"));

    // api update
    app.put("/v1/mongo/update/companies",require("./updateCompanies"));

  }