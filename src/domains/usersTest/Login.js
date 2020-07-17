const userModel = require('../../models/users');
const bcrypt = require('bcryptjs');

module.exports = async function(data){
    if(!data.username) {
        return {
            login: false,
            status:"username not found"
        };
    }
    const userProfile = await userModel.findOne({username: data.username});
    if(userProfile != null){
        const password = await bcrypt.compare(data.password, userProfile.password);

        if(!password) {
            return {
                login: false,
                status:"password not math"
            };
        }

        return {
            login: true,
            status:"succeed"
        };
    }else{
        return {
            login: false,
            status:"username not math"
        };
    }
}