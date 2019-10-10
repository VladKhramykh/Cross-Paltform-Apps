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


const http = require("http");
const fs = require("fs");
const url = require("url");
const {parse} = require("querystring"); 
const sendler = require("./mymodule/index.js");
//const sendler = require("kvo-send");



const mailOptions = {
  from: "vladislav15.04.200040@gmail.com",
  to: "denskyline333@gmail.com",
  subject: 'БГТУ',
  html: '<h1>Смелов В.В</h1><br><h3>Здравствуйте Денис, вы отчислены. Придите пожалуйста в деканат 10 октября в 13:15 - 13:50.<h3>'
};


let http_handler = (req,resp)=>{
  
  resp.writeHead(200, {"Content-Type":"text/html; charset=utf-8"});
  if(url.parse(req.url).pathname === "/" && req.method == "GET"){
    resp.end(fs.readFileSync("./index.html"));
  } else if(url.parse(req.url).pathname === "/send-email" && req.method == "POST"){
    let body = "";
    req.on('data', chunk => {body += chunk.toString();});
    req.on('end', () => {
      let param = parse(body);
      
      //mailOptions.from = param.from,
      mailOptions.to = param.to,
      mailOptions.subject = param.subject,
      mailOptions.html = param.message

      sendler(mailOptions);
      resp.end("<h1> Your message has been sent</h1>");
    })
  } else {
    resp.end("<h1> This url not support!</h1>");
  }

}

// async function send(mailOptions){
//   let testAcc = await nodemailer.createTestAccount();

//   let transporter = nodemailer.createTransport({
//     service: "gmail",
//     host: "smtp.gmail.com",
//     auth:{
//       user: "vladislav15.04.200040@gmail.com",
//       pass: "ArMAGeD0N"      
//     }
//   });
//   transporter.sendMail(mailOptions, function(err, info){
//     if(err)
//       console.log(err);
//     else
//       console.log(info);
//   });
// }

let server = http.createServer(http_handler);
server.listen(3000);