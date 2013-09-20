var express = require('express');
var request = require('request');
var url = require('url');
var util = require('util');
var twitterAPI = require('node-twitter-api');

var twitter = new twitterAPI({
    consumerKey: '1bqgKCYYc3apD7tdIbGXMg',
    consumerSecret: 'Jkt9XQmb5oRIChqZMK4zgP3vJ3c5OhSPaWtgLtTEQ',
    callback: 'http://yoururl.tld/something'
});

var access_token_key = '28795209-eFflFcXhNci65Z7DZkcQS4Y94cEiOwoee5vU7vQKr';
var access_token_secret = 'koJQHYbLcXR7V5UlqTl1h2lP59lCuKZaMFf12tCw';

var app = express();

app.get('/', function(req, res) {
    res.sendfile(__dirname + "/index.html");
});

app.get('/tweets/:username', function(req, res) {
    var username = req.params.username;
    res.write("Most recent tweet for " + username + "\n");

    twitter.getTimeline('user', {
        screen_name: username,
        count: 1
    }, access_token_key, access_token_secret, function(err, data) {

        if (data !== undefined) {
            res.write(JSON.stringify(data[0].text) + "\n");
        }

        if (err !== null) {
            res.write(err);
        }

        res.end();
    });


});

app.listen(8080);

console.log("Server has started on port 8080");