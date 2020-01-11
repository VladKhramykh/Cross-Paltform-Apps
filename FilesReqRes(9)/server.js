let express = require("express");
const bodyParser = require('body-parser');
let xmlBuilder = require("xmlbuilder");
let parseString = require("xml2js").parseString;
let multer = require("multer");

let app = express();
let urlencodedParser = bodyParser.urlencoded({extended:true});
app.use(express.static(__dirname));

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + `-${file.originalname}`);
    }
});

let upload = multer({storage: storage});

app.get('/',urlencodedParser, function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.get("/task9", upload.single("file"), function (req, res) {
    let path = req.query.path;
    console.log(path);
    res.sendfile(path);
});

app.post("/task6", upload.single("file"), function (req, res, next) {
    if(!req.body){
        gege(res);
        return;
    }
    let filedata = req.file;
    console.log(filedata);
    if(!filedata)
        res.end("Error");
    else{
        res.sendfile(filedata.path);
    }
});

app.post("/task5", urlencodedParser, function (req, res) {
    if(!req.body){
        gege(res);
        return;
    }
    let xmlFromReq = req.body.xml;
    res.set({
        "Content-Type":"text/xml",
        "accept":"text/xml"
    });
    parseString(xmlFromReq, (err,str)=>{
        if(err){
            res.end("xml parse error");
            gege(res);
        } else{
            let idResponse = str["request"].$.id;
            let x1 = parseInt(str["request"]["x"][0].$.value);
            let x2 = parseInt(str["request"]["x"][1].$.value);
            let m1 = str["request"]["m"][0].$.value;
            let m2 = str["request"]["m"][1].$.value;
            let m3 = str["request"]["m"][2].$.value;
            let xmlDoc = xmlBuilder.create("response").att("id",idResponse).att("request", "99");
            xmlDoc.ele("sum").att("element","x").att("result",x1+x2)
                .up().ele("concat").att("element","m").att("result", m1.concat(m2,m3));
            res.end(xmlDoc.toString({pretty:true}));
        }
    });

});

app.post("/task4", urlencodedParser, function (req, res) {
    if(!req.body){
        gege(res);
        return;
    }
    console.log(req.body);
    res.set({
        "Content-Type":"application/json"
    });
    res.end(JSON.stringify(req.body, null, '\t'));
});

app.get("/task1", function (req,res) {
    console.log(`Status code: ${res.statusCode}`);
    console.log(`Status message: ${res.statusMessage}`);
    console.log(`Remote IP: ${res.connection.remoteAddress}`);
    console.log(`Remote port: ${res.connection.remotePort}`);
    res.set({
        "Content-Type":"text/html"
    });
    res.end("<h1>Task 1 has been completed!</h1>");
});

app.get("/task2", function (req,res) {
    console.log(`Status code: ${res.statusCode}`);
    console.log(`x = ${req.query.x}`);
    console.log(`y = ${req.query.y}`);
    res.set({
        "Content-Type":"text/html"
    });
    res.end("<h1>Task 2 has been completed!</h1>");
});

app.post("/task3", urlencodedParser, function (req,res) {
    console.log(`Status code: ${res.statusCode}`);
    if(!req.body){
        gege(res);
        return;
    }
    console.log(`X =  ${req.body.x}`);
    console.log(`Y =  ${req.body.y}`);
    console.log(`S =  ${req.body.s}`);
    res.set({
        "Content-Type":"text/html"
    });
    res.end("<h1>Task 3 has been completed!</h1>");
});


let gege = function (res){
    res.set({
        "Content-Type":"text/html"
    });
    res.end("<h1>gege</h1>");
};

app.listen(3000, function () {
    console.log("Server is running! But I'm not sure");
});