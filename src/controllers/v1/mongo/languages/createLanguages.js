const createLanguages = require("../../../../domains/mongo/languages/createLanguages");
module.exports =async (req, res,next) =>{
    const createResult = await createLanguages(req.body).catch(next);
    res.send(createResult);
}