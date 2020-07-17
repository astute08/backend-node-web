const userModel = require('../../models/users');

module.exports = async function(req){
    const {username} = req.params;
    //userModel
    const id = await userModel.findOne({username: username});
    const userDeleted = await userModel.findByIdAndUpdate(id._id, {deleted: true});
    return userDeleted;
};