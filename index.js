
var CHANNEL_ACCESS_TOKEN ="VfEqtjp5Fs1y8ppkWUYOYFoAnFXgXW97Fmdd7fUSdq9BvqVd7q4pwEuByNp6LD4HaYY+SpPGqLTEqlGDRUPtMNYPOoqhhQKJpdErc3Byma7PIHzrjHjYmXTQG41Q2iR2kdW/5ISjyJkwDSohNXMfrwdB04t89/1O/w1cDnyilFU="
var CHANNEL_SECRET = "4728fca7bd18f9616a1ee360c080b9ac"
var USER_ID = "Ucd0a0eaf7095b056a8b497f2e69c38bc"
const line = require('@line/bot-sdk');
const express = require('express');

// create LINE SDK config from env variables
const config = {
  channelAccessToken: CHANNEL_ACCESS_TOKEN,
  channelSecret: CHANNEL_SECRET,
};

// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/webhook', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result));
});

// event handler
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }

  // create a echoing text message
  const echo = { type: 'text', text: event.message.text };

  // use reply API
  return client.replyMessage(event.replyToken, echo);
}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
