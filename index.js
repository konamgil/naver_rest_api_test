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

var process = require('process');
var firstQuery = process.argv[2];
var secondQuery = process.argv[3];

if(secondQuery != undefined){
  firstQuery = firstQuery + " " +  secondQuery;
}

var searchCount = '19';
var query = firstQuery || '삼전동 한식';
var uri = '/v1/search/blog.xml?query=' + urlencode(query) + '&display=' + urlencode(searchCount) ;
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
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function(chunk) {
        // 	console.log('BODY: ' + chunk);
        parseString(chunk, function(err, result) {
            // console.dir(result);
            fs.writeFile('./검색조회/' + query + '.json', JSON.stringify(result,null, 4), (err) => {
                if (err) throw err;
                console.log(query + '의 검색이 완료되었습니다.');
            });
        });
    });
});
req.end();
