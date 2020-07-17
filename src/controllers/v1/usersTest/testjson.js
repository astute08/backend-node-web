const teamsModel = require("../../../models/myServerDB")
module.exports = (req, res) =>{
    const {t} = req.params;
    const i = "key2";
    const y = '{"Dashboard":"test", "a":"2","'+i+'":"3"}';
    const q = JSON.parse(y);
    var key = "happyCount";
    var obj = {};
    obj[key] = "someValueArray";
    //q.forEach((item)=>{
        console.log(obj);
    //})
    
    res.send("test");
}