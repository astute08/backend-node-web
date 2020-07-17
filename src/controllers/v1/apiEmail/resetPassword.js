const query = require("../../../domains/mysql/queryPromise/mysqlQuery");
const sendEmail = require("./sendEmail");
module.exports = async (req, res, next) =>{
    let users = [req.body];
    const result = await sendEmail(users, "resetPassword").catch(next);
    console.log("result:  ",result);
    res.send(result);
}
// {
//     name:"name-lastname",
//     email: "greenmind444@gmail.com",
//     subject:"Invite user to the company",
//     url:"http://www.google.com/"
// }