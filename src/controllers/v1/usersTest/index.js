module.exports = function (app) {
  app.get("/v1/users/:username?", require("./listData")); // view users
  app.post("/v1/users/create", require("./createData")); // add users 
  app.put("/v1/users/update/:username", require('./updateData')); // update user
  app.delete("/v1/users/delete/:username", require('./deleteData')); // delete user
  
  app.post("/v1/users/login",require('./userLogin')); // sign in user

  app.get("/testjson/:t?",require('./testjson'));
}