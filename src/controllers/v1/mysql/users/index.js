module.exports = function(app) {
  app.post("/v1/mysql/users/:user_id?", require("./getUsers")); // view users
  app.post("/v1/mysql/finduserbydata", require("./findUserByData")); // find by some user's data exam: user email, phone ETC..
  app.put("/v1/mysql/update/userprofile", require("./updateUserProfile")); // update user
  app.put("/v1/mysql/update/workstatus", require("./changeStatus"));
  app.put("/v1/mysql/update/userexpiration", require("./updateExpiration"));
  app.post("/v1/mysql/create/user", require("./createUser"));
  app.delete("/v1/mysql/user", require("./deleteUser"));
  app.post("/v1/mysql/login", require("./userLogin"));
  app.post("/v1/mysql/logout", require("./userLogout"));
};
