const deleteUser = require('../../../domains/users/delete');

module.exports = async function(req, res, next){
    const userSent = await deleteUser(req).catch(next);

    res.send({
        deleted: true,
        user: userSent
      });
}