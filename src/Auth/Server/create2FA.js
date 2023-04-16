var https = require('follow-redirects').https;
var fs = require('fs');

var options = {
    'method': 'POST',
    'hostname': 'wpedd1.api.infobip.com',
    'path': '/2fa/2/applications',
    'headers': {
        'Authorization': process.env.API_KEY,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    'maxRedirects': 20
};

var req = https.request(options, function (res) {
    var chunks = [];

    res.on("data", function (chunk) {
        chunks.push(chunk);
    });

    res.on("end", function (chunk) {
        var body = Buffer.concat(chunks);
        console.log(body.toString());
    });

    res.on("error", function (error) {
        console.error(error);
    });
});

var postData = JSON.stringify({
    "name": "2fa application name",
    "enabled": true,
    "configuration": {
        "pinAttempts": 5,
        "allowMultiplePinVerifications": true,
        "pinTimeToLive": "10m",
        "verifyPinLimit": "2/4s",
        "sendPinPerApplicationLimit": "5000/12h",
        "sendPinPerPhoneNumberLimit": "30/1d"
    }
});

req.write(postData);

req.end();