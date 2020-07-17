// แยก ไฟล์ index แต่ละ folder
module.exports = function (app) {
    //api get
    app.get("/v1/mongo/labels/:companyCode?",require("./getLabels"));

    // api create 
    app.post("/v1/mongo/create/labels", require("./createLabels"));

    // api delete
    app.delete("/v1/mongo/delete/labels/:tagName",require("./deleteLabels"));

    // api update
    app.put("/v1/mongo/update/labels",require("./updateLabels"));

  }