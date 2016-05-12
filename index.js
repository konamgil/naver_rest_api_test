var request = require('request');
var urlencode = require('urlencode');
var https = require('https');
var fs = require('fs');
var parseString = require('xml2js').parseString;
var config = require('./config');


var client_id = config.accout.client_id;
var client_secret = config.accout.client_secret;
var host = 'openapi.naver.com';
var port = 443;
// var uri = 'v1/search/blog.xml&query=' + query;
var query = '필동 밥집';
var uri = '/v1/search/blog.xml?query=' + urlencode(query);
var options = {
    host: host,
    port: port,
    path: uri,
    method: 'GET',
    headers: {
        'X-Naver-Client-Id': client_id,
        'X-Naver-Client-Secret': client_secret
    }
};

var req = https.request(options, function(res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + res.headers);
    res.setEncoding('utf8');
    res.on('data', function(chunk) {
        // 	console.log('BODY: ' + chunk);
        // fs.writeFile('result.xml',chunk, (err) => {
        //   if (err) throw err;
        //   console.log('It\'s saved!');
        //   });
        parseString(chunk, function(err, result) {
            // console.dir(result);
            fs.writeFile('./검색조회/' + query + '.json', JSON.stringify(result), (err) => {
                if (err) throw err;
                console.log('It\'s saved!');
            });
        });
    });
});
req.end();
