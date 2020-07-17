const languageModel = require("../../../models/mongo/languages");

module.exports= async (req)=>{
    const addLanguages = await languageModel.create(req);

    return addLanguages;
}