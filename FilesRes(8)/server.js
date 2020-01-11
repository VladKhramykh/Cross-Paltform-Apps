let http = require("http");
let fs = require("fs");
let url = require("url");
let qs = require("querystring");
let xmlBuilder = require("xmlbuilder");
let parseString = require("xml2js").parseString;

let server = http.createServer((req, res)=>{

    if( req.method === "GET" && url.parse(req.url).pathname === "/connection"){
        let params = url.parse(req.url,true).query;
        if(params.set !== "undefined" && params.set != null){
            server.keepAliveTimeout = parseInt(params.set);
        }
        connection(req,res);
    } else if(req.method === "GET" && url.parse(req.url).pathname === "/headers"){
        res.writeHead(200,{"Content-Type":"text/html; charset=utf-8"});
        res.end(h(req));
    } else if(req.method === "GET" && url.parse(req.url).pathname === "/parameter"){
        parameter(req,res);
    } else if(req.method === "GET" && url.parse(req.url).pathname === "/parameter/x/y"){

    } else if(req.method === "GET" && url.parse(req.url).pathname === "/close"){
        setTimeOutCloseServer(req,res);
    } else if(req.method === "GET" && url.parse(req.url).pathname === "/socket"){
        socket(req,res);
    } else if(req.method === "GET" && url.parse(req.url).pathname === "/req-data"){
        let filename = "soikel.jpg";
        reqData(res, filename);
    } else if(req.method === "GET" && url.parse(req.url).pathname === "/resp-status"){
        setCodeResponse(req,res);
    } else if(req.method === "POST" && url.parse(req.url).pathname === "/formparameter"){
        formparameter(req,res);
    } else if(url.parse(req.url).pathname === "/json"){
        jsonReqRes(req,res);
    } else if(req.method === "POST" && url.parse(req.url).pathname === "/xml"){
        xmlReqRes(req,res);
    } else if(req.method === "GET" && url.parse(req.url).pathname === "/files"){
        readFiles("./",req,res);
    } else if(req.method === "GET" && url.parse(req.url).pathname === "/css"){
        getFile(req,res);
    } else if(req.method === "GET" && req.method === "POST" && url.parse(req.url).pathname === "/upload"){
        upload(req, res);
    } else {
        res.writeHead(404,{"Content-Type":"text/html; charset=utf-8"});
        res.end("<h1>ULR is not correct </h1>");
    }
});

server.listen(3000, ()=>{
    console.log("Server is running!");
});

function upload(req, res) {
    
}

function getFile(req,res){
    if(isStatic("html", req.url))
        sendFile(req,res, {"Content-Type":"text/html; charset=utf-8"});
    else if(isStatic("css", req.url))
        sendFile(req,res, {"Content-Type":"text/css; charset=utf-8"});
    else if(isStatic("js", req.url))
        sendFile(req,res, {"Content-Type":"text/javascript; charset=utf-8"});
    else if(isStatic("docx", req.url))
        sendFile(req,res, {"Content-Type":"application/msword;"});
    else if(isStatic("doc", req.url))
        sendFile(req,res, {"Content-Type":"application/msword;"});
    else if(isStatic("json", req.url))
        sendFile(req,res, {"Content-Type":"application/json;"});
    else if(isStatic("xml", req.url))
        sendFile(req,res, {"Content-Type":"application/xml;"});
    else if(isStatic("mp4", req.url))
        sendFile(req,res, {"Content-Type":"video/webm;"});
    else if(isStatic("png", req.url))
        sendFile(req,res, {"Content-Type":"image/png;"});
    else
        http404(req,res);
}

function readFiles(dir, req, res) {
    fs.readdir(dir, (err, files)=>{
       res.writeHead(200, `X-static-files-count: ${files.length}`);
       res.end(`Count files: ${files.length}`);
    });
}

function xmlReqRes(req, res) {

    let xmlFromReq = "";

    req.on("data", chunk=>{
        xmlFromReq += chunk;
    });
    req.on("end", ()=>{
        //console.log(xmlFromReq);
        parseString(xmlFromReq, (err,str)=>{
           if(err){
               res.end("xml parse error");
           } else{
               let idResponse = str["request"].$.id;
               //let x1 = isNaN(parseInt(str["request"]["x"][0].$.value))? parseInt(str["request"]["x"][0].$.value): "Incorrect parameter ";
               //let x2 = isNaN(parseInt(str["request"]["x"][1].$.value))? parseInt(str["request"]["x"][1].$.value): "Incorrect parameter ";
               let x1 = parseInt(str["request"]["x"][0].$.value);
               let x2 = parseInt(str["request"]["x"][1].$.value);
               let m1 = str["request"]["m"][0].$.value;
               let m2 = str["request"]["m"][1].$.value;
               let m3 = str["request"]["m"][2].$.value;

               let xmlDoc = xmlBuilder.create("response").att("id",idResponse).att("request", "99");
               xmlDoc.ele("sum").att("element","x").att("result",x1+x2)
                   .up().ele("concat").att("element","m").att("result", m1.concat(m2,m3));

               res.writeHead(200, {"Content-Type":"text/xml","accept":"text/xml"});
               res.end(xmlDoc.toString({pretty:true}));
           }
        });


    });


}

function jsonReqRes(req, res) {
    if(req.method === "GET"){
        let json = JSON.stringify({
            __comment: "valera",
            x: 1,
            y: 2,
            message: "Helooooo",
            arr: ["Big", "Baby", "Tape"],
            obj: { firstname: "Vlad", surname: "Na babkax"}
        });
        res.writeHead(200,{"Content-Type": "text/html; charset=utf-8"});
        res.write(`<h2>${json}</h2><br>`);
        res.end(`<form action='/json' method='post'>` +
            `<textarea name='reqJson'>${json}</textarea>` +
            `<input type='submit' value='Check (POST)'>` +
            `</form>`);

    } else if(req.method === "POST"){
        let reqparams = "";
        req.on("data", chunk => {
            reqparams += chunk;
        });
        req.on("end", ()=>{
            let reqJson = qs.parse(reqparams).reqJson;

            let params = JSON.parse(reqJson);
            let comm = params.__comment + "(from server)";
            let x = params.x;
            let y = params.y;
            let congrats = "ю andestend mi";
            let arrLength = params.arr.length;

            let responseJson = JSON.stringify({
                __comment: comm,
                x_plus_y: x+y,
                congrats: congrats,
                arrLength: arrLength
            });

            res.writeHead(200, {"Content-Type":"text/html; charset=utf-8"});
            res.end(`<h2>${responseJson}</h2>`);
        });
    } else {
        http404(req,res);
    }
}

function formparameter(req, res) {
    let body = "";
    req.on("data", chunk =>{
        body += chunk;
    });
    req.on("end", ()=>{
        let params = qs.parse(body);
        res.writeHead(200, {"Content-Type":"text/html; charset=utf-8"});
        res.write(`<h1>Name = ${params.name}</h1>`);
        res.write(`<h1>Age = ${params.age}</h1>`);
        res.write(`<h1>Date = ${params.date}</h1>`);
        res.write(`<h1>Course = ${params.course}</h1>`);
        res.write(`<h1>About = ${params.about}</h1>`);
        res.write(`<h1>Button number = ${params.subButt}</h1>`);
    });
}

function reqData(res, filename) {
    let i = 0;
    let readStream = fs.ReadStream(filename);
    readStream.on('data', (chunk)=>{
        res.write(chunk);
        i++;
    });
    readStream.on("end", () => {
        console.log("Count of parts = " + i);
        res.end();
    });
}

function setCodeResponse(req, res){
    let params = url.parse(req.url,true).query;

    let message = null;
    let code = parseInt(params.code);
    message = params.message.toString();
    if(message != null && !isNaN(code)){
        res.statusCode = code;
        res.statusMessage = message;

        res.end(`${res.statusCode} - ${res.statusMessage}`);
    }
}

function setTimeOutCloseServer(req, res) {
    let message = "<h1>This server will shut down after 10 seconds</h1>";
    res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
    res.end(message);
    setTimeout(() => {
        console.log("Server has been closed!");
        server.close();
    }, 10000);
}

function parameter(req, res) {
    let params = url.parse(req.url, true).query;
    let parseX = parseInt(params.x);
    let parseY = parseInt(params.y);

    if(!isNaN(parseX) && !isNaN(parseY)){
        let result =    `<h3>Sum = ${parseX + parseY}</h3>
                            <h3>Sub = ${parseX-parseY}</h3>
                            <h3>Mul = ${parseX * parseY}</h3>
                            <h3>Div = ${parseX/parseY}</h3>`;

        res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
        res.end(result);
    } else{
        ERRParam(req,res);
    }
}

function socket(req,res) {
    res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
    res.end(`<h1>
                            Remote address - ${req.connection.remoteAddress} <br>
                            Remote port - ${req.connection.remotePort} <br>
                            Local address - ${req.connection.localAddress} <br>
                            Local port - ${req.connection.localPort} <br>
                       </h1>`);
}

function connection (req, res){
    res.writeHead(200,{"Content-Type":"text/html; charset=utf-8"});
    res.end(`<h1>KeepAliveTimeout = ${server.keepAliveTimeout.toString()} </h1>`);
}

let h = (r)=>{
    let rc = "<h1>Headers</h1><br>";
    for(let key in r.headers){
        rc +=`<h3>${key}:${r.headers[key]}</h3>`;
    }
    return rc;
};

function http404(req,res){
    res.writeHead(404, {"Content-Type":"text/html; charset=utf-8"});
    res.end(`<h1>404)))))))))))))))))))))))))))))))))))))))))0</h1>`);
}

function ERRParam(req,res){
    res.writeHead(405, {"Content-Type":"text/html; charset=utf-8"});
    res.end(`<h1>Param is not correct!</h1>`);
}

let isStatic = (ext, fn) => {
    let reg = new RegExp(`^\/.+\.${ext}$`);
    return reg.test(fn);
};

let pathStatic = (fn)=>{
    return `./static${fn}`;
};

let pipeFile = (req, res, headers) => {
    res.writeHead(200, headers);
    fs.createReadStream(pathStatic(req.url)).pipe(res);
};

let sendFile = (req, res, headers)=>{
    fs.access(pathStatic(req.url), fs.constants.R_OK, err => {
        if(err)
            http404(req,res);
        else
            pipeFile(req, res, headers);
    })
};