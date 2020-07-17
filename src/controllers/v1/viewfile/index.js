

module.exports = (app) =>{
    app.get("/documents/:id/:filename", require("./viewfiles"));
    app.get("/img/:filename", require("./viewfiles"));

}