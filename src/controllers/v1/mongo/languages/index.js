// แยก ไฟล์ index แต่ละ folder
module.exports = function (app) {
  // api get
    app.get("/v1/mongo/Languages/:languageCode?",require("./getLanguages"));

    // api create 
    app.post("/v1/mongo/create/languages", require("./createLanguages"));

    // api delete
    app.delete("/v1/mongo/delete/languages/:languageCode",require("./deleteLanguages"));

    // api update
    app.put("/v1/mongo/update/languages",require("./updateLanguages"));

  }