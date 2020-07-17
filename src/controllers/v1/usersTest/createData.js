const addUsers = require('../../../domains/users/create');
module.exports = async function (req, res,next){
    const userSent = await addUsers(req.body).catch(next);

    res.send(userSent);
}