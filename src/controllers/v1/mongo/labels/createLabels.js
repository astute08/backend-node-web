const createLabels = require("../../../../domains/mongo/labels/createLabels");
module.exports = async (req, res, next) =>{
    const createResult = await createLabels(req.body).catch(next);
    res.send(createResult);
}