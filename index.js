const express = require('express');
const xml = require('xml');
const {makeCall} = require('./twilio.js');
const {getCleverBotReply} = require('./cleverbot.js');
const bodyParser = require("body-parser");

const app = express();

const twiml = (msg) => `
<Response>
    <Gather input="speech">
      <Say>${msg}</Say>
    </Gather>
</Response>
`

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello World!'));

app.post('/call', (req, res) => {
  console.log(req.body.SpeechResult);
  const message = req.body.SpeechResult;
  if(message) getCleverBotReply(message).then((reply) => {
    console.log(reply);
    res.set('Content-Type', 'text/xml');
    res.send(twiml(reply));
  });
  else res.send(twiml("Good morning. Is your refrigerator running?"));
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));

makeCall();

