const net = require("net");

let HOST = "0.0.0.0";
let PORT = 4000;

net.createServer((sock)=>{
    console.log("Server connected: " + sock.remoteAddress + ":" + sock.remotePort);

    sock.on("data", (data)=>{
        console.log(sock.remoteAddress + ":" + data);
        sock.write(sock.remoteAddress+ ": " + data);
    });

    sock.on("close", (data)=>{
        console.log("Server closed: " + sock.remoteAddress);
    })
}).listen(PORT, HOST);

console.log("TCP Server: " + HOST+":"+PORT);