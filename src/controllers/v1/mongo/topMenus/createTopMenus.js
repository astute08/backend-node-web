const createTopMenus = require("../../../../domains/mongo/topMenus/createTopMenus");
module.exports = async (req, res, next) =>{
    const createResult = await createTopMenus(req.body).catch(next);
    res.send(createResult);
}