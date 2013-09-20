var express = require('express');
var request = require('request');
var url = require('url');

var app = express.createServer();

app.get('/', function(req, res) {
	res.sendfile(__dirname + "/index.html");
});

app.listen(8080);