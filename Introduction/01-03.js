var http = require('http');

let h = (r)=>{
    let rc = "<h1>Headers</h1><br>";
    for(key in r.headers){
        rc += '<h3>' + key + ':' + r.headers[key] + '</h3>';
    }
    return rc;
}

http.createServer(function (request, response){
    let b = '';
    request.on('data', str=>{b += str; console.log('data', b);});
    response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    request.on('end', ()=>response.end(
            '<!DOCTYPE html> <hmtl><head></head>'+
            '<body>'+
            '<h1>Request structure</h1>'+
            '<h2>'+'method - ' + request.method + '</h2>'+
            '<h2>'+'url - ' + request.url + '</h2>'+
            '<h2>'+'version - ' + request.httpVersion + '</h2>'+
            '<h2>'+'HEADERS - ' + '</h2>'+
            h(request)+
            '<h2>' + 'body: ' + b + '</h2>'+
            '</body>'+
            '</html>'
        )        
    )
}).listen(3000);

console.log('Server running at http://localhost:3000/');