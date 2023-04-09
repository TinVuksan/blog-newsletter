var https = require('follow-redirects').https;
var fs = require('fs');

var options = {
    'method': 'POST',
    'hostname': 'wpedd1.api.infobip.com',
    'path': `/2fa/2/applications/${process.env.MessageID}/messages`,
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
    "pinType": "NUMERIC",
    "messageText": "Your 2FA code is {{pin}}",
    "pinLength": 4,
    "language": "en",
    "senderId": "Infobip 2FA",
    "repeatDTMF": "1#",
    "speechRate": 1
});

req.write(postData);

req.end();