const userModel = require('../../models/users')
module.exports = async function (username) {
  if(username !== undefined){
    const data = await userModel.find({username:username});
    return data;
  }else{
    const data = await userModel.find();
    return data;
  }
  
}