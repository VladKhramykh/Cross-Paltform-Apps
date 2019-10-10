// const sendmail = require('sendmail')();
 
// sendmail({
//     from: 'vladislav15.04.200040@gmail.com',
//     to: 'vladislav15.04.200040@gmail.com',
//     subject: 'БГТУ',
//     html: '<h1>Смелов В.В</h1><br><h3>Здравствуйте Денис, вы отчислены. Придите пожалуйста в деканат 10 октября в 13:15 - 13:50.<h3>'
//   }, function(err, reply) {
//     console.log(err && err.stack);
//     console.dir(reply);
// });

const nodemailer = require("nodemailer");

const send = function(mailOptions){

  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth:{
      user: "vladislav15.04.200040@gmail.com",
      pass: "ArMAGeD0N"      
    }
  });
  transporter.sendMail(mailOptions, function(err, info){
    if(err)
      console.log(err);
    else
      console.log(info);
  });
}

module.exports = send;