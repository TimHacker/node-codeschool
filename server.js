var express = require('express');
var app = express();

var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

var port = process.env.PORT || 8080;

server.listen(port);

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.sendfile(__dirname + "/index.html");
});

io.configure(function() {
    io.set("transports", ["xhr-polling"]);
    io.set("polling duration", 10);
});

io.sockets.on('connection', function(socket) {
    socket.on('join', function(name) {
        socket.set('nickname', name);
        console.log(name + " joined.");
    });

    console.log('Client connected...');

    socket.on('messages', function(message) {

        socket.get('nickname', function(err, name) {
            socket.broadcast.emit('messages', '<-- ' + name + ': ' + message);
            console.log(name + " sent " + message);
        });

    });
});


//app.listen(8080);

console.log("Server has started on port " + port);

// var express = require("express");
// var app = express();
// app.use(express.logger());

// app.get('/', function(request, response) {
//   response.send('Hello World!');
// });

// var port = process.env.PORT || 5000;
// app.listen(port, function() {
//   console.log("Listening on " + port);
// });