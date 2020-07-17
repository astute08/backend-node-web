const labelsModel = require("../../../models/mongo/labels");
module.exports = async (req) =>{
    const addLabels = await labelsModel.create(req);
    return addLabels;
}