var http = require('http');

var makeRequest = function(message) {

	var options = {
		host: 'www.google.com',
		path: '/',
		method: 'GET'
	};

	var request = http.request(options, function(response) {
		response.pipe(process.stdout, { end: false});
	});

	console.log(message);
	request.end();
};

exports.makeRequest = makeRequest;
