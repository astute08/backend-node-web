const userMomdel = require('../../models/users');
const bcrypt = require("bcryptjs");
module.exports = async function(user){
    const hashPassword = await bcrypt.hash(user.password, 10);
    const userNew = {...user, password: hashPassword};
    const userAdded = await userMomdel.create(userNew);
    
    return userAdded;
}