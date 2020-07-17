module.exports =(app)=>{
    require("./organization/index")(app);
    require("./permissionGroup/index")(app);
    require("./roles/index")(app);
    require("./emergencyContact/index")(app);
}