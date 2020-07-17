const mssql = require("mssql");

module.exports = function (app) {
  app.get("/v1/mssql/test", async function (req, res, next) {


    const request = new mssql.Request();
    const result = await request.query("SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES;");

    res.send(result.recordset);
  });

  app.get("/v1/mssql/table/create", require("./createTable"));
}