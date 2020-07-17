const mysql = require("mysql");

const connection = mysql.createConnection({
  host : '192.168.11.181',
  port : 8102,
  user : 'root',
  password : '1234',
  database : 'kg',
  insecureAuth : true
});
connection.connect(function(err){
    if(err) throw err;
    console.log("connected !"+ connection.threadId);
});
const connection2 = mysql.createConnection({
  host : '192.168.11.181',
  port : 8102,
  user : 'root',
  password : '1234',
  database : 'k_test',
  insecureAuth : true
});
connection2.connect(function(err){
    if(err) throw err;
    console.log("connected !"+ connection2.threadId);
});

// const connection3 = mysql.createConnection({
//     host : '203.154.43.133',
//     port : 3306,
//     user : 'root',
//     //password : '=====zuper@min01',
//     //database : '====tl_kg2_system',
//     insecureAuth : true
//   });
//   connection3.connect(function(err){
//     if(err) throw err;
//     console.log("connected !"+ connection3.threadId);
// });


const connection4 = mysql.createConnection({
  host : '192.168.11.181',
  port : 8102,
  user : 'root',
  password : '1234',
  database : 'KG_WFM_DEV',
  insecureAuth : true
});
connection4.connect(function(err){
    if(err) throw err;
    console.log("connected !"+ connection4.threadId);
});
const data_base_items = {
  kg:connection,
  k_test: connection2,
  //tl_kg2_system: connection3,
  kg_wfm_dev:connection4
}

  module.exports = data_base_items;