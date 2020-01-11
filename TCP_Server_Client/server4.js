const net = require("net");

let HOST = "0.0.0.0";
let PORT1 = 4000;
let PORT2 = 4001;

let result = 0;

let label = (pfx, port, sock)=>{
    return `${pfx}${sock.remoteAddress}:${sock.remotePort}-> `;
};

let connection = new Map();

let bodyServer = () =>{return (sock)=>{
    sock.id = (new Date()).toISOString();
    connection.set(sock.id, {comment: "data for connection"});
    console.log("---- Connected: " + sock.remoteAddress + ":" + sock.remotePort);

    sock.on("data", (data) => {
        console.log(label("data: ", sock.remotePort, sock) + data);
        sock.write(label("echo: ", sock.remotePort, sock) + data);
    });

    sock.on("close", (data) => {
        console.log(label("close: ", sock.remotePort, sock));
        connection.delete(sock.id);
    });

    sock.on("error", ()=>{
        console.log(label("error: ", sock.remotePort, sock))
        connection.delete(sock.id);
    });
}}


net.createServer(bodyServer()).listen(PORT1, HOST).on("listening", ()=>{
    console.log(`TCP Server ${HOST}:${PORT1}`);
});

net.createServer(bodyServer()).listen(PORT2, HOST).on("listening", ()=>{
    console.log(`TCP Server ${HOST}:${PORT2}`);
});