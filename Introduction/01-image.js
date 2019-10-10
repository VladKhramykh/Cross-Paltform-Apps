let http = require('http');
let fs = require('fs');

http.createServer(function(request, response){
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
}).listen(5000);

console.log('Server running at http://localhost:5000/');