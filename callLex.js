const express = require('express')
const request = require('request');

const app = express()
const port = 3000
var botName = 'KonektNowTest';
var botAlias = 'KonektNowTest';
var userId = 'sidakula';

var postHeaders = { 
    'X-Amz-Content-Sha256' : 'beaead3198f7da1e70d03ab969765e0821b24fc913697e929e726aeaebf0eba3',
    'Content-Type' : 'application/json' ,
    'X-Amz-Date' : '20200509T234844Z',
    'Authorization' : 'AWS4-HMAC-SHA256 Credential=AKIAXKPP3UF47J5MDBHX/20200509/us-east-1/lex/aws4_request, SignedHeaders=host;x-amz-content-sha256;x-amz-date, Signature=babdb02da8fb8a87551764734dd37a37c1576915169a6e9b2d480d0864274783'
};

app.post('/lex', function(req, res) {
    console.log("hi");
    request.post(
        // { 
        //     url : 'https://runtime.lex.us-east-1.amazonaws.com/bot/${botName}/alias/${botAlias}/user/${userId}/text' ,
        //     headers : postHeaders 
        // }
        'https://runtime.lex.us-east-1.amazonaws.com/bot/KonektNowTest/alias/KonektNowTest/user/sidakula/text',
        req,
        function (error, response, body) {

            if (! error == null) { 
                console.log("heloo");
                return console.log(error); 
            }
            if (!error && response.statusCode == 200) {
                res.json(body)
            }
        });
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))


