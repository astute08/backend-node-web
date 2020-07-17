const deleteLanguage = require("../../../../domains/mongo/languages/deleteLanguages");

module.exports = async(req, res, next) =>{
    const {languageCode} = req.params;
    const deleteResult = await deleteLanguage(languageCode).catch(next);
    res.send(deleteResult);
}