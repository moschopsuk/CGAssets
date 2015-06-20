var express = require('express');
var socket	= require('socket.io');
var app 	= express();

//Serve content out of public dir
app.use(express.static('public'));

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('LA1:TV CG app listening at http://%s:%s', host, port);
});

var io = socket.listen(server);

io.on('connection', function(socket) {
	console.log("Client Socket Connected");

	//Forward data to frontend
	socket.on("lowerthird", function(payload) {
		io.sockets.emit("lowerthird", payload);
	});

	socket.on("grid", function(payload) {
		io.sockets.emit("grid", payload);
	});

	socket.on("bug", function(payload) {
		io.sockets.emit("bug", payload);
	});
});





