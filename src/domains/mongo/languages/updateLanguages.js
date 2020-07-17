const languageModel = require("../../../models/mongo/languages");
module.exports = async (req) =>{
    const languageCode = req.languageCode;
    const id = await languageModel.findOne({languageCode:languageCode});
    if(!id){return []};
    const deleteLanguage = await languageModel.findByIdAndUpdate({_id:id._id},req);
    return deleteLanguage;
}