const userListData = require("../../../domains/users/list");

module.exports = async function (req, res, next) {
  const data = await userListData(req.params.username).catch(next);
  res.send(data);
}