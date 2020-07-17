// แยก ไฟล์ index แต่ละ folder
module.exports = function (app) {
    // api get
    app.get("/v1/mongo/topmenus/:companyCode?",require("./getTopMenus"));

    // api create 
    app.post("/v1/mongo/create/topmenus", require("./createTopMenus"));

    // api delete
    app.delete("/v1/mongo/delete/topmenus/:tagName",require("./deleteTopMenus"));

    // api update
    app.put("/v1/mongo/update/topmenus",require("./updateTopMenus"));

  }