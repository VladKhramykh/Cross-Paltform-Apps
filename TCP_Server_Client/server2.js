const net = require("net");

let HOST = "0.0.0.0";
let PORT = 4000;

let result = 0;

net.createServer((sock)=>{
    console.log("Server connected: " + sock.remoteAddress + ":" + sock.remotePort);

    sock.on("data", (data)=>{
        console.log(sock.remoteAddress + ":" + data);
        result += parseInt(data);
    });

    setInterval(()=>{
        sock.write(result.toString());
    },5000);

    sock.on("close", (data)=>{
        console.log("Server closed: " + sock.remoteAddress);
    })
}).listen(PORT, HOST);

console.log("TCP Server: " + HOST+":"+PORT);