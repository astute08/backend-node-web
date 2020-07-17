const queryPromise = require("../../../../domains/mysql/queryPromise/mysqlQuery");
var fs = require('fs');
 
// delete file named 'sample.txt' Synchronously

module.exports = async (req, res, next) =>{
    if(req.body == undefined ){
        res.status(400).send("invalid syntax!");
        return 0;
    }
    let {user_document_id}  = req.body.user_document_id;
    let queryPath = "select path from users_documents where user_document_id = '"+user_document_id+"'";
    const getPath = await queryPromise(queryPath).catch(next);
    if(getPath[0] !== undefined){
        fs.unlinkSync("."+getPath[0].path, (err)=>{
            if(err){
                res.send({reject:"delete failed."})
                return 0;
            }
            console.log('File deleted!');
            let queryDelete = "delete from users_documents where user_document_id = '"+user_document_id+"'";
            const deleteResult = await queryPromise(queryDelete).catch(next);
            res.send(deleteResult);
        });
        

    }

}