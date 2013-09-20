var express = require('express');
var app = express();

var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

server.listen(8080);

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.sendfile(__dirname + "/index.html");
});

io.sockets.on('connection', function (socket) {
    socket.on('join', function (name) {
        socket.set('nickname', name);
        console.log(name + " joined.");
    });

    console.log('Client connected...');

    socket.on('messages', function (message) {

        socket.get('nickname', function (err, name) {
            socket.broadcast.emit('messages', '<-- ' + name + ': ' + message);
            console.log(name + " sent " + message);
        });

    });
});


//app.listen(8080);

console.log("Server has started on port 8080");