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
    console.log('Client connected...');
    // socket.emit('news', {hello: 'world'});
    // socket.on('my other event', function (data) {
    //     console.log(data);
    // });
});

//app.listen(8080);

console.log("Server has started on port 8080");