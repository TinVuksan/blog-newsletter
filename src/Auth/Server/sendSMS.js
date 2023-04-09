var https = require('follow-redirects').https;
//var fs = require('fs');

const sendSMS = () => {
  let pinID = '';
  var options = {
    'method': 'POST',
    'hostname': 'wpedd1.api.infobip.com',
    'path': '/2fa/2/pin?ncNeeded=true',
    'headers': {
        'Authorization': process.env.API_KEY,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    'maxRedirects': 20
  }

var req = https.request(options, function (res) {
    var chunks = [];
    res.on("data", function (chunk) {
        chunks.push(chunk);
    });

    res.on("end", function (chunk) {
        var body = Buffer.concat(chunks);
        pinID = body.toString();
        pinID = JSON.parse(pinID);
        console.log(body.toString());
        console.log("Ovo je pinID: ", pinID.pinId);
        //Kak izvaditi pinID i iskoristiti ga u Infobipovom endpointu??
    

    });

    res.on("error", function (error) {
        console.error(error);
    });
  
});

var postData = JSON.stringify({
    "applicationId": process.env.AppID,
    "messageId": process.env.MessageID,
    "from": "TinBlog",
    "to": process.env.Mob,
});

req.write(postData);
req.end();
}

module.exports = {sendSMS};

