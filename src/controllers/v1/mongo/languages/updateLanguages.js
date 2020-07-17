const updateLanguage = require("../../../../domains/mongo/languages/updateLanguages");
module.exports= async(req, res, next) =>{
    const updateResult = await updateLanguage(req.body).catch(next);
    res.send(updateResult);
}