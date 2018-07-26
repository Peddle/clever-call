const express = require('express');
const xml = require('xml');
const {makeCall} = require('./twilio.js');
const {getCleverBotReply} = require('./cleverbot.js');
const bodyParser = require("body-parser");

const app = express();

const twiml = (msg) => `
<Response>
    <Gather speechTimeout="auto" timeout="20" input="speech">
      <Say>${msg}</Say>
    </Gather>
    <Redirect method="GET">http://aaronpeddle.com:3000/call</Redirect> 
</Response>
`

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello World!'));
app.get('/call', (req, res) => {
  const msg = "are you there?";
  console.log("bot: " + msg);
  res.send(twiml(msg));
});
app.post('/call', (req, res) => {
  console.log("user: "+req.body.SpeechResult);
  const message = req.body.SpeechResult;
  if(message) getCleverBotReply(message).then((reply) => {
    console.log("bot: "+reply);
    res.set('Content-Type', 'text/xml');
    res.send(twiml(reply));
  });
  else res.send(twiml("Good morning. Is your refrigerator running?"));
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));

makeCall();

