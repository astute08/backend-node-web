// แยก ไฟล์ index แต่ละ folder
module.exports = function (app) {
    // api get 
    app.get("/v1/mongo/leftmenus/:companyCode?",require("./getLeftMenus"));

    // api create 
    app.post("/v1/mongo/create/leftmenus", require("./createLeftMenus"));

    // api delete
    app.delete("/v1/mongo/delete/leftmenus/:companyCode",require("./deleteLeftMenus"));

    // api update
    app.put("/v1/mongo/update/leftmenus",require("./updateLeftMenus"));

  }