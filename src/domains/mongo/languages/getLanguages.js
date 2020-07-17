const languagesModel = require("../../../models/mongo/languages");
module.exports = async (languageCode)=>{
    let params = languageCode ? {languageCode: languageCode}: undefined;
    const getResult = await languagesModel.find(params);
    return getResult;
}