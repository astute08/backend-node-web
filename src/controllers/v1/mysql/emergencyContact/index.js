module.exports = (app) =>{
    app.get("/v1/mysql/emergencycontacts/:user_id?",require("./getEmergencyContact"));
    app.post("/v1/mysql/create/emergencycontact", require("./createEmergencyContact"));
    app.delete("/v1/mysql/delete/emergencycontact/:contact_id", require("./deleteEmergencyContact"));
}