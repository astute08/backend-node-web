const createPromise = require("../../../../domains/mysql/queryPromise/mysqlCreate");
const queryPromise = require("../../../../domains/mysql/queryPromise/mysqlQuery");
// {
//     "organization_id":"",
//     "document_name":""
// }
module.exports = async(req, res, next) =>{
    if(req.body == undefined ){
        res.status(400).send("invalid syntax!");
        return 0;
    }
    const docName = req.body.document_name;
    const orgID = req.body.organization_id;
    let query = "select * from master_documents where document_name = '"+docName+"' limit 1";
    const getResult = await queryPromise(query).catch(next);
    console.log(getResult[0]);
    //  หา document id จาก document name 
    // ในกรณีที่เจอใน master document จะดึง id มาใช้เพิ่มใน company document
    if(getResult[0] !== undefined){    
        if(getResult[0].document_master_id !== undefined ){
            query = "insert into company_documents (document_name, document_master_id, organization_id) "+
                " values (?, ?, ?) ";
            createResult = await createPromise(query,[docName, getResult[0].document_master_id, orgID]).catch(next);
            res.send(createResult);
        }else{
            res.status(500).send({reject:"create failed."});
        } 
    }else{
        // ในกรณีที่ไม่เจอ document name ใน master document จะดึง id มาใช้เพิ่มใน master document ก่อนแล้วค่อยมาเพิ่มที่ company document
        query = "insert into master_documents (document_name) values (?)";
        let createResult = await createPromise(query,[docName]).catch(next);
        if(createResult.affectedRows === 1 
            && createResult.serverStatus === 2
                && createResult.insertId !== 0){
                    query = "insert into company_documents (document_name, document_master_id, organization_id) "+
                            " values (?, ?, ?) ";
                    createResult = await createPromise(query,[docName, createResult.insertId, orgID]).catch(next);
                    res.send(createResult);
                }else{
                    res.status(500).send({reject:"create failed."});
                }
    }
}