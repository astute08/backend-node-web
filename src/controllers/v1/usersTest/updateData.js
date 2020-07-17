const updateUser = require('../../../domains/users/update');

module.exports = async function(req, res, next){
    const updated = await updateUser(req).catch(next);

    res.send(updated);
}