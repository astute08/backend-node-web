module.exports = app => {
  app.get("/v1/mysql/teams/:company_id?/:user_id?", require("./getTeams")); // view teams
  app.post("/v1/mysql/create/teams", require("./createTeam")); // insert teams
  app.delete("/v1/mysql/teams/:user_org_id", require("./deleteTeam")); // delete team
  

};
