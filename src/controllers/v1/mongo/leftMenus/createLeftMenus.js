const createLeftMenus = require("../../../../domains/mongo/leftMenus/createLeftMenus");
module.exports = async (req, res,next) =>{
    const createResult = await createLeftMenus(req.body).catch(next);
    res.send(createResult);
}