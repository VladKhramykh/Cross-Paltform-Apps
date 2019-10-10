var http = require('http');
var fs = require('fs');
var url = require('url');

http.createServer(function(request, response){
    response.contentType='text/plain';

    let secondUrl = 'http://localhost:3000/name';

    if(url.parse(request.url).pathname === '/name'){
        console.log(request.url);
        response.end('Vlad Khramykh 3 course 6 group)');
    } else if(url.parse(request.url).pathname === '/xmlhttprequest'){            
        var file = fs.readFile('./xmlhttprequest.html', (err,data)=>{
            response.end(data);
        })        
    } else if(url.parse(request.url).pathname === '/fetch'){
            
        var file = fs.readFile('./fetch.html', (err,data)=>{
            response.contentType='text/plain';
            response.end(data);
        })        
    } else if(url.parse(request.url).pathname === '/html'){
        let html = fs.readFileSync('./index.html');
        response.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
        response.end(html);
    } else if(url.parse(request.url).pathname === '/png'){
        let image = null;
        let fname = './soikel.jpg';

        fs.stat(fname, (err, stat)=>{
            if(err){
                console.log('error: ', err);
            } else{
                image = fs.readFileSync(fname);
                response.writeHead(200, {'Content-Type':'image/jpeg', 'Content-Length':stat.size});
                response.end(image, 'binary');
            }
        })
    } else if(url.parse(request.url).pathname === '/jquery'){        
        fs.readFile('./jquery.html', (err, data)=>{
            if(err){
                response.end(err.code + ' - ' + err.message);
            } else{
                response.contentType = 'text/html';
                response.end(data);
            }
        })        
    }
}).listen(3000);