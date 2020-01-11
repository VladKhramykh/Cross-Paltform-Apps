const net = require("net");

let HOST = "127.0.0.1";
let PORT = "4000";

let client = new net.Socket();
let stdin = process.openStdin();
let chunk;

client.connect(PORT, HOST, ()=>{
    console.log("Client connected: " + client.remoteAddress + ":" + client.remotePort);

    stdin.addListener("data", data=>{
        client.write("Result: " + data);
    });

    setTimeout(()=>{
        client.end();
    }, 20000);
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

function randomInteger(min, max) {
    // случайное число от min до (max+1)
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}