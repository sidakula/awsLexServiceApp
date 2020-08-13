const express = require('express')
const request = require('request');
const AWS = require('aws-sdk');
const axios = require('axios')
var uuid = require('uuid');
const config = require('./config.json');
 


const ImageAnalyser = require('./imageRek');
var bodyParser = require('body-parser');

const app = express()
const port = 3000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/lex', async function(req, res) {
    
    var s3 = new AWS.S3(); 
    let imageLabels = await ImageAnalyser.getImageLabels(req.body.inputText);

    let imageLabelsFuture = await (imageLabels).promise();
    const modLabels = imageLabelsFuture.ModerationLabels;

    for (let i in modLabels) {  
        if (modLabels[i].Confidence < 20){
         console.log('Valid image - uploading to S3');
        } else {
         throw Error ('Inappropriate picture'); 
        }
   }

   var imageResponse = await axios.request({
    method: 'GET',
    url: req.body.inputText,
    responseType: 'arraybuffer',
    reponseEncoding: null
});
console.log("Axios Response", imageResponse)
try{
    var data = await s3.putObject({
    Body: imageResponse.data,
    Key: uuid.v4() +'.jpg',
    Bucket: config.bucket_name
    
}).promise()
    console.log("S3 response", uuid.v1() + '.jpg');

    //console.log("S3 response", data);
}
catch(err){
    console.log(err)
}
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))


