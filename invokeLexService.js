var request = require('request');
const express = require('express');
var AWS = require('aws-sdk');
const crypto = require("crypto");



const app = express()
const port = 3000
var date = new Date();
var region = 'us-east-1';
var service = 'lex';
var algorithm = 'AWS4-HMAC-SHA256';

function getSignatureKey(key, dateStamp, regionName, serviceName) {
    var kDate = crypto.HmacSHA256(dateStamp, "AWS4" + key);
    var kRegion = crypto.HmacSHA256(regionName, kDate);
    var kService = crypto.HmacSHA256(serviceName, kRegion);
    var kSigning = crypto.HmacSHA256("aws4_request", kService);
    return kSigning;
}
// Set the headers
// var postHeaders = { 
//     'X-Amz-Content-Sha256' : 'beaead3198f7da1e70d03ab969765e0821b24fc913697e929e726aeaebf0eba3',
//     'Content-Type' : 'application/json' ,
//     'X-Amz-Date' : date,
//     'Authorization' : 'AWS4-HMAC-SHA256 Credential=AKIAXKPP3UF47J5MDBHX/20200509/us-east-1/lex/aws4_request, SignedHeaders=host;x-amz-content-sha256;x-amz-date, Signature=babdb02da8fb8a87551764734dd37a37c1576915169a6e9b2d480d0864274783'
// };

const access_key = '';// Put here user's AWS_ACCESS_KEY_ID
const secret_key = '';// Put here user's AWS_SECRET_ACCESS_KEY

var credential_scope = date + '/' + region + '/' + service + '/' + 'aws4_request';
signed_headers = 'content-type;host;x-amz-date;x-amz-target';

var signing_key = getSignatureKey(secret_key, date, region, service)

const generated_hash = crypto.createHmac('sha256', signing_key)
.update(request);

const string_to_sign = algorithm + '\n' +  date + '\n' +  credential_scope + '\n' +  generated_hash;

const signature = crypto.createHmac('sha256', signing_key)
                   .update(string_to_sign);

authorization_header = algorithm + ' ' + 'Credential=' + access_key + '/' + credential_scope + ', ' +  'SignedHeaders=' + signed_headers + ', ' + 'Signature=' + signature;

var postHeaders = { 
    'Content-Type' : 'application/json' ,
    'X-Amz-Date' : date,
    'Authorization' : authorization_header
};


// Configure the request
var options = {
    url: 'https://runtime.lex.us-east-1.amazonaws.com/bot/KonektNowTest/alias/KonektNowTest/user/sidakula/text',
    method: 'POST',
    headers: postHeaders
}

app.post('/lex', function(req, res) {
// Start the request
request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        // Print out the response body
        console.log(body)
    }
});
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
