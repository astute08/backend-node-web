const mysql = require("../../../models/myServerDB");
module.exports =(query)=>{
    return new Promise((resolve, reject)=>{
        mysql.kg_wfm_dev.query(query, (err, res)=>{
            if(err)reject(err);
            resolve(res);
        })
    })
}