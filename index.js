const
  bodyParser = require('body-parser'),
  crypto = require('crypto'),
  express = require('express'),
  request = require('request');
  FB = require('fb')
  MongoClient = require('mongodb').MongoClient;
  assert = require('assert');
  cors = require('cors')
  schedule = require('node-schedule');


  require('dotenv').load();



var app = express();
app.use(cors())
app.set('port', process.env.PORT || 5000);
app.use(bodyParser.json({ verify: verifyRequestSignature }));



const
  CHANNEL_SECRET = "4728fca7bd18f9616a1ee360c080b9ac"
  CHANNEL_ACCESS_TOKEN = "VfEqtjp5Fs1y8ppkWUYOYFoAnFXgXW97Fmdd7fUSdq9BvqVd7q4pwEuByNp6LD4HaYY+SpPGqLTEqlGDRUPtMNYPOoqhhQKJpdErc3Byma7PIHzrjHjYmXTQG41Q2iR2kdW/5ISjyJkwDSohNXMfrwdB04t89/1O/w1cDnyilFU="
  USER_ID = "Ucd0a0eaf7095b056a8b497f2e69c38bc"

if (!(APP_SECRET && VERIFY_TOKEN && ACCESS_TOKEN)) {
  console.log(APP_SECRET);
  console.log(VERIFY_TOKEN);
  console.log(ACCESS_TOKEN);
  console.error('Missing config values');
  process.exit(1);
}


app.get('/', function(req, res) {
  if (req.query['hub.mode'] === 'subscribe' &&
      req.query['hub.verify_token'] === VERIFY_TOKEN) {
    console.log('Validating webhook');
    res.status(200).send(req.query['hub.challenge']);
  } else {
    console.error('Failed validation. Make sure the validation tokens match.');
    res.sendStatus(403);
  }
});

app.post('/web', function(req, res) {
  var message = req.body.message
  res.header("Access-Control-Allow-Origin", "*")
  res.setHeader('Content-Type', 'application/json');
  var resp = {
    "message": message+'reply'
  }
  res.status(200)
  console.log('post web')
  console.log(resp)
  res.json(resp)
})


app.post('/', function (req, res) {


});





function sendTextMessage(recipientId, messageText) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: messageText
      }
    };
    callSendAPI(messageData);

  }




// Start server
// Webhooks must be available via SSL with a certificate signed by a valid
// certificate authority.
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

module.exports = app;
