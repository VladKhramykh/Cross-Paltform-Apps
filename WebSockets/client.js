const WebSocket = require("ws");

const ws = new WebSocket("ws://localhost:4000");

const duplex = WebSocket.createWebSocketStream(ws, {encoding: "utf8"});

process.stdin.pipe(duplex);

//if u need a broadcast >
//duplex.pipe(process.stdout);
