const topMenusModel = require("../../../models/mongo/topMenus");

module.exports = async(req) =>{
    let arr = [];
    for(let index =0;index<req.length; index++){
        const companyCode = req[index].companyCode;
        const obj = manageEditor(req[index]);
        console.log(obj);
        const id = await topMenusModel.findOne({ companyCode: companyCode });
        if (!id) return [];
          const updateLeftMenu = await topMenusModel.update(
            { _id: id._id },obj);
          arr = [...arr,updateLeftMenu];
    }
  return arr;
};
const manageEditor= (req)=>{
        const obj = {};
        const obj2 = {};
        switch(req.editRequire){
            case "editOne":
                const updateWhere = "languages." + req.vocab + "." + req.languageCode;
                obj2[updateWhere] = req.value;;
                obj["$set"] = obj2;
            break;
            case"editAll":
            const updateWhere2 = "languages";
                obj2[updateWhere2] = req.languages;;
                obj["$set"] = obj2;
            break;
        }
        return obj;
}