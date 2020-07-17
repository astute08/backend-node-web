const mysql = require("../../../models/myServerDB");
module.exports =(query, newVal)=>{
    return new Promise((resolve, reject)=>{
        mysql.kg_wfm_dev.query(query, newVal, (err, res)=>{
            if(err)reject(err);
            resolve(res);
        })
    })
}