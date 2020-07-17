const updateLeftMenu = require("../../../../domains/mongo/leftMenus/updateLeftMenu");

module.exports = async (req, res, next) =>{
    const updateResult = await updateLeftMenu(req.body).catch(next);
    res.send(updateResult);
} 