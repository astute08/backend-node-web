const mssql = require("mssql");
const createTable = require("../../../domains/mssql/createTable");

module.exports = async function (req, res, next) {

  const request = new mssql.Request();
  const tables = await request.query("SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES;");

  const result = await createTable(tables.recordsets[0]);

  res.send(result);
}