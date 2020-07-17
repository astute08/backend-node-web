// แยก ไฟล์ index แต่ละ folder
module.exports = function (app) {
    // api create 
    app.post("/v1/mongo/create/languages", require("./languages/createLanguages"));
    app.post("/v1/mongo/create/companies", require("./companies/createCompanies"));
    app.post("/v1/mongo/create/leftmenus", require("./leftMenus/createLeftMenus"));
    app.post("/v1/mongo/create/topmenus", require("./topMenus/createTopMenus"));
    app.post("/v1/mongo/create/labels", require("./labels/createLabels"));

    // api delete
    app.delete("/v1/mongo/delete/languages/:languageCode",require("./languages/deleteLanguages"));
    app.delete("/v1/mongo/delete/companies/:companyCode",require("./companies/deleteCompanies"));
    app.delete("/v1/mongo/delete/leftmenus/:tagName",require("./leftMenus/deleteLeftMenus"));
    app.delete("/v1/mongo/delete/topmenus/:tagName",require("./topMenus/deleteTopMenus"));
    app.delete("/v1/mongo/delete/labels/:tagName",require("./labels/deleteLabels"));

    // api update
    app.put("/v1/mongo/update/languages",require("./languages/updateLanguages"));
    app.put("/v1/mongo/update/companies",require("./companies/updateCompanies"));
    app.put("/v1/mongo/update/leftmenus",require("./leftMenus/updateLeftMenus"));
    //app.put("/v1/mongo/update/topmenus",require("./topMenus/updateTopMenus"));
    //app.put("/v1/mongo/update/labels",require("./labels/updateLabels"));

  }