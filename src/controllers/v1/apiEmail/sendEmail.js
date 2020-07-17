const email = require("../../../models/emailAuth");
const nodemailer = require("nodemailer");
const EmailTemplate = require("email-templates").EmailTemplate;
const path = require("path");
const createPromise = require("../../../domains/mysql/queryPromise/mysqlCreate");
let transporter = nodemailer.createTransport({
    service:"gmail",
    port: 465,
    secure: true, 
    auth:{
        user:email.user,
        pass:email.pass
    }
});

let mailOption ={
    from: 'Me'
    //,
    // subject:"hello kiki",
    // text:"test 1234",
    // attachments:[
    //     {filename:"uuu.jpg",path:"./uuu.jpg"}
    // ]
}
const sendEmail = async (obj, user_id, emailtype)=>{
    console.log(obj);
    var date = new Date();
        date.setTime(date.getTime()+(24*60*60*1000));
        var expires = date.toLocaleString().replace(",","");
    
    let arrDate = expires.split(" ");
    let arrDate2 = arrDate[0].split("/");
    let year = arrDate2.splice(-1)[0];
    date = arrDate2.splice(0,0, year);
    let day= arrDate2.join("-");
    expires = day+" "+arrDate[1];

    let dateNow = new Date().toLocaleDateString().split("/");
    year = dateNow.splice(-1)[0];
    dateNow.splice(0, 0, year);
    dateNow = dateNow.join("-");
    try{
        let query = " insert into email_logs (email_id,email_type, email_user, expiration_link, email_status, create_at) "+
                    " values (?,?,?,?,?,?,?) ";
        return new Promise((resolve, reject) => {transporter.sendMail(obj, async (err, info)=>{
                console.log( __dirname+"/views/");
                transporter.close();
                if(err){
                    let emailId = Math.random().toString(36).substr(2,37);
                    let emailType = emailtype == "invite" ? "invite" : "reset password"  ;
                    let emailUser = obj.to !== undefined ? obj.to : "no to email";
                    let expirationLink = expires;
                    let emailStatus = "sending failed:"+err;
                    let createAt = dateNow;
                    let arr = [emailId, emailType, emailUser, expirationLink, emailStatus, createAt];
                    console.log(arr);
                    await createPromise(query,arr);
                    resolve(emailStatus);
                }else{
                    let emailId = info.messageId.slice(1,37);
                    let emailType = emailtype == "invite" ? "invite" : "reset password"  ;
                    let emailUser = obj.to !== undefined ? obj.to : "null";
                    let expirationLink = expires;
                    let emailStatus = "sending success";
                    let createAt = dateNow;
                    let arr = [emailId, emailType, emailUser, expirationLink, emailStatus, createAt];
                    console.log(arr);
                    await createPromise(query,arr);
                    console.log("Message sent: %s",info.messageId.slice(1,37));
                    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
                    resolve("Message sent!!!");
                }
            })
        })
    }catch(ex){
        console.log("error !!!")
        return "error";
    }
    
}


const loadTemplate = (user,folderName)=>{
    let template = new EmailTemplate(path.join(__dirname, "/templates/",folderName));
    return new Promise((resolve, reject) => {user.map((context)=>{
        console.log(template);
        template.render(context, (err, result)=>{
            if(err) reject("error jaa");
            else resolve({
                email: result,
                context,
            });
        }).catch(error => { throw error})
         })
    });
}
const setTemplate = (user, folderName) => {
    return new Promise ((resolve, reject)=>{(
        loadTemplate(user, folderName).then(async (results) =>{
                mailOption["to"] = results.context.email;
                mailOption["subject"] = results.context.subject;
                mailOption["html"] = results.email.html;
                //console.log(results);
                let result = await sendEmail(mailOption, user.user_id ,folderName);
                resolve(result);
            })
        )
    });
}


module.exports = async (user, folderName, next) =>{
    const result =await setTemplate(user, folderName).catch(next);
    return result;
}

