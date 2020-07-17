const userLogin = require('../../../domains/users/Login');

module.exports = async function(req, res, next){
    const resultLogin = await userLogin(req.body).catch(next);
    res.send(resultLogin);

    
}