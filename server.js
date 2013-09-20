var express = require('express');
var request = require('request');
var url = require('url');
var twitter = require('ntwitter');

var twit = new twitter({
    consumer_key: '1bqgKCYYc3apD7tdIbGXMg',
    consumer_secret: 'Jkt9XQmb5oRIChqZMK4zgP3vJ3c5OhSPaWtgLtTEQ',
    access_token_key: '28795209-eFflFcXhNci65Z7DZkcQS4Y94cEiOwoee5vU7vQKr',
    access_token_secret: 'koJQHYbLcXR7V5UlqTl1h2lP59lCuKZaMFf12tCw'
});

var app = express();

app.get('/', function(req, res) {
    res.sendfile(__dirname + "/index.html");
});

app.get('/tweets/:username', function(req, res) {

    var username = req.params.username;
    console.log("stream of tweets for location");

    twit.stream('statuses/filter', {'locations':'-122.75,36.8,-121.75,37.8,-74,40,-73,41'}, function(stream) {
      stream.on('data', function (data) {
        console.log(data.text);
      });
    });
});

app.listen(8080);

console.log("Server has started on port 8080");