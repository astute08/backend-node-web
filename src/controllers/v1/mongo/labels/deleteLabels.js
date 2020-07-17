const deleteLabels= require("../../../../domains/mongo/labels/deleteLabels");

module.exports = async(req, res, next) =>{
    const {tagName} = req.params;
    console.log(tagName);
    const deleteResult = await deleteLabels(tagName).catch(next);
    res.send(deleteResult);
}