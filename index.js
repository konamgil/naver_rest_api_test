var request = require('request');
var utf8 = require('utf8');
var query = utf8.encode('반지의제왕');
var https = require('https');

 var client_id = 'Hv31_VLvdeMNkte0thBE';
 var client_secret = 'z8J5jzNYe7';
 var host = 'openapi.naver.com';
 var port = 443;
 // var uri = 'v1/search/blog.xml&query=' + query;
var uri = '/v1/search/movie.xml?query='+query;
 var options = {
 		host: host,
 		port: port,
 		path: uri,
 		method: 'GET',
 		headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
 };

 var req = https.request(options, function(res) {
 		console.log('STATUS: ' + res.statusCode);
 		console.log('HEADERS: ' + res.headers);
 		res.setEncoding('utf8');
 		res.on('data', function (chunk) {
 				console.log('BODY: ' + chunk);
 		});
 });
 req.end();
