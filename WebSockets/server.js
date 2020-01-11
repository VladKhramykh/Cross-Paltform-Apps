const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();

const wss = new WebSocket.Server({
    port: 4000
});
const clients = {};

wss.on("connection", function (ws) {
    var id = Math.random().toFixed(3);
    clients[id] = ws;
    console.log("new conn - " + id);
    ws.on("message", function (message) {
        console.log(id+": " + message);
        for(var key in clients){
            clients[key].send(message);
        }
    });
    
    ws.on("close", function () {
        console.log("conn was close - " + id);
        delete clients[id];
    });
});

app.get("/start", function (req, res) {
    res.sendFile(__dirname + '/start.html');
});

app.listen(3000);


