const languagesModel = require("../../../models/mongo/languages");
module.exports = async(languageCode) =>{
    const id =  await languagesModel.findOne({languageCode: languageCode});
    if(!id)return [];
    const deleteLangiage = await languagesModel.findByIdAndRemove(id._id);
    return deleteLangiage;
}