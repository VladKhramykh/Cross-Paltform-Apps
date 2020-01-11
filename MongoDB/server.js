const MongoClient = require("mongodb").MongoClient;
const http = require("http");
const assert = require("assert");
let url = require("url");

const dburl = "mongodb://localhost:27017";
const dbName = "bstu";

let server = http.createServer(function(req, res) {
    if(req.method === "GET" && url.parse(req.url).pathname === "/api/faculties"){
        let data = "";
        MongoClient.connect(dburl, function (err, client){
            const db = client.db(dbName);
            showFaculties(db, res, function () {
                client.close();
            });
        });
    } else if(req.method === "GET" && url.parse(req.url).pathname === "/api/pulpits"){
        let data = "";
        MongoClient.connect(dburl, function (err, client){
            const db = client.db(dbName);
            showPulpits(db, res, function () {
                client.close();
            });
        });
    } else if(req.method === "POST" && url.parse(req.url).pathname === "/api/faculties"){
        let data = "";
        MongoClient.connect(dburl, function (err, client){
            const db = client.db(dbName);
            req.on("data", (chunk)=>{
                data += chunk;
            });
            req.on("end", ()=>{
                console.log(data);
                addFaculty(db, res, JSON.parse(data), function () {
                    client.close();
                });
            });
        });
    } else if (req.method === "POST" && url.parse(req.url).pathname === "/api/pulpits"){
        let data = "";
        MongoClient.connect(dburl, function (err, client){
            const db = client.db(dbName);
            req.on("data", (chunk)=>{
                data += chunk;
            });
            req.on("end", ()=>{
                addPulpit(db, res, JSON.parse(data), function () {
                    client.close();
                });
            });
        });
    } else if(req.method === "DELETE" && url.parse(req.url).pathname === "/api/faculties"){
        let data = "";
        MongoClient.connect(dburl, function (err, client){
            const db = client.db(dbName);
            req.on("data", (chunk)=>{
                data += chunk;
            });
            req.on("end", ()=>{
                deleteFaculty(db, res, JSON.parse(data), function () {
                    client.close();
                });
            });
        });
    } else if (req.method === "DELETE" && url.parse(req.url).pathname === "/api/pulpits"){
        let data = "";
        MongoClient.connect(dburl, function (err, client){
            const db = client.db(dbName);
            req.on("data", (chunk)=>{
                data += chunk;
            });
            req.on("end", ()=>{
                deletePulpit(db, res, JSON.parse(data), function () {
                    client.close();
                });
            });
        });
    }else if(req.method === "PUT" && url.parse(req.url).pathname === "/api/faculties"){
        let data = "";
        MongoClient.connect(dburl, function (err, client){
            const db = client.db(dbName);
            req.on("data", (chunk)=>{
                data += chunk;
            });
            req.on("end", ()=>{
                updateFaculty(db, res, JSON.parse(data), function () {
                    client.close();
                });
            });
        });
    } else if (req.method === "PUT" && url.parse(req.url).pathname === "/api/pulpits"){
        let data = "";
        MongoClient.connect(dburl, function (err, client){
            const db = client.db(dbName);
            req.on("data", (chunk)=>{
                data += chunk;
            });
            req.on("end", ()=>{
                updatePulpit(db, res, JSON.parse(data), function () {
                    client.close();
                });
            });
        });
    }
});

server.listen(3000, ()=>{
    console.log("http server started");
});



const showPulpits = function(db, res, callback) {
    const collection = db.collection('pulpit');
    collection.find().toArray(function f(err, results) {
        res.end(JSON.stringify(results));
    });
};

const showFaculties = function(db, res, callback) {
    const collection = db.collection('faculty');
    collection.find().toArray(function f(err, results) {
        res.end(JSON.stringify(results));
    });
};

const addFaculty = function(db, res, newFaculty, callback) {
    const collection = db.collection('faculty');
    collection.insertOne(newFaculty, function(err, result) {
        if(err)
            console.log(err);
        else {
            res.end(JSON.stringify(result));
        }
    });
};

const addPulpit = function(db, res, newPulpit, callback) {
    const collection = db.collection('pulpit');
    collection.insertOne(newPulpit, function(err, result) {
        if(err)
            console.log(err);
        else {
            res.end(JSON.stringify(result));
        }
    });
};

const deletePulpit = function(db, res, pulpit, callback) {
    const collection = db.collection('pulpit');
    collection.findOneAndDelete (pulpit, function(err, result) {
        if(err)
            console.log(err);
        else {
            res.end(JSON.stringify(result));
        }
    });
};

const deleteFaculty = function(db,res, faculty, callback) {
    const collection = db.collection('faculty');
    collection.findOneAndDelete (faculty, function(err, result) {
        if(err)
            console.log(err);
        else {
            res.end(JSON.stringify(result));
        }
    });
};

const updatePulpit = function(db, res, pulpit, callback) {
    const collection = db.collection('pulpit');
    collection.findOneAndUpdate({pulpit:pulpit["pulpit"]},{$set:{pulpit:pulpit["newPulpit"]}}, function(err, result) {
        if(err)
            console.log(err);
        else {
            res.end(JSON.stringify(result));
        }
    });
};

const updateFaculty = function(db,res,faculty, callback) {
    const collection = db.collection('faculty');
    collection.findOneAndUpdate ({faculty:faculty["faculty"]},{$set:{faculty:faculty["newFaculty"]}}, function(err, result) {
        if(err)
            console.log(err);
        else {
            res.end(JSON.stringify(result));
        }
    });
};