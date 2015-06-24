var express = require('express');
var socket  = require('socket.io');
var app     = express();
var env     = require('node-env-file');

//Load up the .env file
env(__dirname + '/.env');

//Serve content out of public dir
app.use(express.static('public'));

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('LA1:TV CG app listening at http://%s:%s', host, port);
});

var io = socket.listen(server);

var bug         = {}
,   grid        = {}
,   lowerthird  = {}
;

io.on('connection', function(socket) {
    console.log("Client Socket Connected");

    //send init states for the CG
    socket.emit("lowerthird", lowerthird);
    socket.emit("grid", grid);
    socket.emit("bug", bug);

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
});





