const net = require("net");

let HOST = "127.0.0.1";
let PORT = "4000";

let client = new net.Socket();
let stdin = process.openStdin();

client.connect(PORT, HOST, ()=>{
    console.log("Client connected: " + client.remoteAddress + ":" + client.remotePort);
});

stdin.addListener("data", data => {
    client.write(data);
});

client.on("data", (data)=>{
    console.log(data.toString());
    //client.destroy();
});

client.on("close", ()=>{
    console.log("Client closed");
});

client.on("error", ()=>{
    console.log("Client error");
});