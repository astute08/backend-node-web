const getLanguages = require("../../../../domains/mongo/languages/getLanguages");
module.exports = async (req, res, next)=>{
    const {languageCode} = req.params;
    const getResult = await getLanguages(languageCode).catch(next);
    res.send(getResult);
}