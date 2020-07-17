require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors');
//const mysql = require("mysql");
const mssql = require("mssql");
const app = express();
const PORT = process.env.PORT || 3000;
let fs = require('fs');

//
app.use(cors());
// Config Middleware for req
app.use(bodyParser.json());
app.options('*', cors())

app.get("/", cors(), function (req, res, next) {
  res.send("Auto Deploy. เสร็จแล้ววววววว");
});

app.post("/", function (req, res, next) {
  res.send(req.body);
});


app.get("/createfile", (req, res, next)=>{
  let dir = './tmp';

  if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
  }
// function to encode file data to base64 encoded string
  let file = "./img/123.jpg";
  let bitmap = fs.readFileSync(file);
      // convert binary data to base64 encoded string
  let basr64 = new Buffer(bitmap).toString('base64');

  //let base64Data = basr64.replace(/^data:image\/jpg;base64,/, "");

  fs.writeFile(dir+"/rewrite.jpg", basr64, 'base64', function(err,res) {
    if(err){console.log("error:===",err);};
    console.log(res);
  });

  res.send(basr64);
})





require("./src/controllers/v1/mssql/index")(app);

// api send email templates
require("./src/controllers/v1/apiEmail/index")(app);
// // api view file
require("./src/controllers/v1/viewfile/index")(app);
// api documents
require("./src/controllers/v1/mysql/document/index")(app);
//=================
// api team (member)
require("./src/controllers/v1/mysql/teams/index")(app);
//=================
// api organization
require("./src/controllers/v1/mysql/organization/index")(app);
//=================
// api permissionGroup
require("./src/controllers/v1/mysql/permissionGroup/index")(app);
//=================
// api role
require("./src/controllers/v1/mysql/roles/index")(app);
//=================
// api emergencyContact
require("./src/controllers/v1/mysql/emergencyContact/index")(app);
//=================
// api skill
require("./src/controllers/v1/mysql/skills/index")(app);

// api languages create/update/delete
require("./src/controllers/v1/mongo/companies/index")(app);
require("./src/controllers/v1/mongo/labels/index")(app);
require("./src/controllers/v1/mongo/languages/index")(app);
require("./src/controllers/v1/mongo/leftMenus/index")(app);
require("./src/controllers/v1/mongo/topMenus/index")(app);
///=========================================================

//api users
require("./src/controllers/v1/mysql/users/index")(app);
//=================


// Config Error Middleware
app.use(require("./src/middlewares/errorHandler"));





const config = {
  user: process.env.MSSQL_USER,
  password: process.env.MSSQL_PASSWORD,
  server: process.env.MSSQL_SERVER,
  database: process.env.MSSQL_DATABASE
}
mssql.connect(config, err => {
  if(err) console.error("Can't connect to mssql", err);
  else console.info("Connected to mssql");
});

const mongoOpts = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.connect(process.env.MONGO_CONNECTION, mongoOpts, (err) => {
  if (err) console.error("Can't connect to mongodb", err);
  else console.info("Connected to mongodb");
});


const server = app.listen(PORT, () => {
  console.info(`listening at ${server.address().port}`);
});

