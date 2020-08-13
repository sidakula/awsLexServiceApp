const AWS = require('aws-sdk');
const image2base64 = require("image-to-base64");

const rek = new AWS.Rekognition({
  region: 'us-east-1',
  accessKeyId: "AKIAXKPP3UF47J5MDBHX",
  secretAccessKey: "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"
});

const downloadUrlImageBase64 = async url => {
  return await image2base64(url) // you can also to use url
    .then(response => {
      return response;
    })
    .catch(error => {
      console.log("error base64");
      console.log(error); //Exepection error....
    });
};

class ImageAnalyser {

  static async getImageLabels(url) {
    let base64Image = await downloadUrlImageBase64(url);


    const params = {
      Image: {
        Bytes: new Buffer.from(base64Image, 'base64')
       },
      // HumanLoopConfig: {
      //   FlowDefinitionArn: 'konektNowFlow', /* required */
      //   HumanLoopName: 'ImageTestName', /* required */
      //   DataAttributes: {
      //     ContentClassifiers: [
      //       'FreeOfPersonallyIdentifiableInformation' | 'FreeOfAdultContent'
      //       /* more items */
      //     ]
      //   }
      // },
      MinConfidence: '0'
    };

    //console.log(url);

    try {
    return await rek.detectModerationLabels(params, function(err, data) {   
      if (err) 
      console.log(err, err.stack);
      else 
      console.log(data.ModerationLabels);
      console.log("test1111");
    })
    } catch (e) {
      console.log(e);
    }


    rekognition.detectText
       // an error occurred   else     console.log(data);           
       // successful response })
    // return new Promise((resolve, reject) => {
    //   rek.detectModerationLabels(params, (err, data) => {
    //     if (err) {
    //       reject(new Error(err));  
    //     }
    //     resolve(data.ModerationLabels);
    //   });
    // });
  }
}

module.exports = ImageAnalyser;
