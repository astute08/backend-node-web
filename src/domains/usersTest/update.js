const userModel = require('../../models/users');
const bcrypt = require('bcryptjs');

module.exports = async function(req){
    const user = req.body;
    const username = req.body.username;
    let updated ;
    if(user.password != undefined){
        const hashPassword = await bcrypt.hash(user.password, 10);
        const userNewData = {...user, password: hashPassword};
        updated = await userModel.findOneAndUpdate(username,userNewData);
    }else{
        updated = await userModel.findOneAndUpdate(username,user);
    }
    

    return updated;
}