var express = require('express');
var app = express();

var redis = require('redis');
var redisClient = redis.createClient();

var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

var port = process.env.PORT || 8080;

server.listen(port);

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.sendfile(__dirname + "/index.html");
});

// io.configure(function() {
//     io.set("transports", ["xhr-polling"]);
//     io.set("polling duration", 10);
// });

var storeMessage = function(name, data) {
    var message = JSON.stringify({
        name: name,
        data: data
    });

    redisClient.lpush("messages", message, function(err, response) {
        redisClient.ltrim("messages", 0, 10);
        console.log(response);
    });
};

io.sockets.on('connection', function(socket) {
    console.log('Client connected...');

    socket.on('join', function(name) {
        socket.set('nickname', name);
        socket.broadcast.emit("chat", name + " joined the chat");

        socket.broadcast.emit("add chatter", name);

        redisClient.smembers('chatters', function(err, names) {
            console.log("names: " + names);

            names.forEach(function(name) {
                socket.emit('add chatter', name);
            });
        });

        redisClient.sadd("chatters", name);

        redisClient.lrange("messages", 0, -1, function(err, messages) {
            messages = messages.reverse();
            console.log("messages from redis: " + messages);
            console.log("error from redis: " + err);

            messages.forEach(function(message) {
                message = JSON.parse(message);
                socket.emit("messages", message.name + ": " + message.data);

                console.log("message from redis: " + message.name + ": " + message.data);
            });
        });

        console.log(name + " joined.");
    });

    socket.on('disconnect', function(name) {
        socket.get('nickname', function(err, name) {
            socket.broadcast.emit("remove chatter", name);
            redisClient.srem("chatters", name);
        });
    });

    socket.on('messages', function(message) {
        socket.get('nickname', function(err, name) {
            socket.broadcast.emit('messages', '<-- ' + name + ': ' + message);
            storeMessage(name, message);

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