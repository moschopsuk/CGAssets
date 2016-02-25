var express = require('express');
var socket  = require('socket.io');
var env     = require('node-env-file');
var less    = require('less-middleware');
var app     = express();

//Load up the .env file
env(__dirname + '/.env');

//Listen for any less and convert it to css
app.use(less(__dirname + '/public'));
//Serve content out of public dir
app.use(express.static(__dirname + '/public'));

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('LA1:TV CG app listening at http://%s:%s', host, port);
});

var io = socket.listen(server);
var bug         = {}
,   grid        = "hide"
,   lowerthird  = "hide"
,   crawler     = "hide"
;

io.on('connection', function(socket) {
    console.log("Client Socket Connected");

    //send init states for the CG
    socket.emit("lowerthird", lowerthird);
    socket.emit("grid", grid);
    socket.emit("bug", bug);
    socket.emit("crawler", crawler);

    //Forward data to frontend
    socket.on("lowerthird", function(payload) {
        lowerthird = payload;
        io.sockets.emit("lowerthird", payload);
        console.log("Updating: lowerthird");
    });

    socket.on("grid", function(payload) {
        grid = payload;
        io.sockets.emit("grid", payload);
        console.log("Updating: grid");
    });

    socket.on("bug", function(payload) {
        bug = payload;
        io.sockets.emit("bug", payload);
        console.log("Updating: bug");
    });

    socket.on("crawler", function(payload) {
        crawler = payload;
        io.sockets.emit("crawler", payload);
        console.log("Updating: crawler");
    });
});
