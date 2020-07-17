const fs = require('fs');
const createPromise = require("../../../../domains/mysql/queryPromise/mysqlCreate");
// {
//     "user_id":,
//     "document_id":,
//     "file_type":".jpg",
//     "base64_data":
// }
module.exports= async (req, res, next)=>{
    if(req.body == undefined ){
        res.status(400).send("invalid syntax!");
        return 0;
    }
    var dir = '/documents/id'+req.body.user_id+"/";
    let fileName = req.body.document_id+"_" + Math.random().toString(36).substr(2, 9);
    let pathFile = dir+fileName+req.body.file_type;
    if (!fs.existsSync("."+dir)){
        fs.mkdirSync("."+dir);
    }
    fs.writeFile("."+pathFile, req.body.base64_data, 'base64', function(err,res) {
        if(err){
            console.log("error:",err);
            res.send(err);
            return 0;
        }
    });
    let queryPromise = "insert into users_documents (user_id, document_id, path) values (?, ?, ?)";
    let newData = [req.body.user_id, req.body.document_id, pathFile]
    const queryResult = await createPromise(queryPromise, newData).catch(next);
    res.send(queryResult);
}

