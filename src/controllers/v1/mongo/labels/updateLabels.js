const updateLabels = require("../../../../domains/mongo/labels/updateLabels");
module.exports = async (req, res, next) =>{
    const updateResult = await updateLabels(req.body).catch(next);
    res.send(updateResult);
}