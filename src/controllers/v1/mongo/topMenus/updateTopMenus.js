const updateTopMenus = require("../../../../domains/mongo/topMenus/updateTopMenus");
module.exports = async(req,res,next)=>{
    const updateResult = await updateTopMenus(req.body).catch(next);
    res.send(updateResult);
}