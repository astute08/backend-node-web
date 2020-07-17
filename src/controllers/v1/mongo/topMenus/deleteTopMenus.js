const deleteTopMenus= require("../../../../domains/mongo/topMenus/deleteTopMenus");

module.exports = async(req, res, next) =>{
    const {tagName} = req.params;
    console.log(tagName);
    const deleteResult = await deleteTopMenus(tagName).catch(next);
    res.send(deleteResult);
}