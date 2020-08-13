const express = require('express')
const request = require('request');

const app = express()
const port = 3000

var method = 'POST';
var service = 'lex';
var host = 'runtime.lex.us-east-1.amazonaws.com';
var region = 'us-east-1';
var endpoint = 'https://runtime.lex.us-east-1.amazonaws.com/';

var accessKey = '';// Put here user's AWS_ACCESS_KEY_ID
var secretKey = '';// Put here user's AWS_SECRET_ACCESS_KEY

var botName = 'TestBot';
var botAlias = 'testbot';
var userId = 'myUserId';//some user id, which will be sent in a Lex request field 'userId'
var postAction = 'text';
var contentType = 'application/json';

var canonicalUri = String.format('/bot/%s/alias/%s/user/%s/%s/', botName, botAlias, userId, postAction);//notice the leading '/'
var canonicalQueryString = '';//optional - usually not used in REST API-s
var signedHeaders = 'content-type;host;x-amz-date';
var algorithm = 'AWS4-HMAC-SHA256';