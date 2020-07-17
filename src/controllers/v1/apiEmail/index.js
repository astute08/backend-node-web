module.exports = (app) =>{
    app.post("/v1/email/invite", require("./inviteEmail"));
    //app.post("/v1/email/resetpassword", require("./resetPassword"));

}