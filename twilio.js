const accountSid = process.env.TWILIO_PROJECT_ID;
const authToken = process.env.TWILIO_SECRET;
const client = require('twilio')(accountSid, authToken);

const targetPhone = 
  process.argv.length >= 3 && process.argv[2] || process.env.DEFAULT_PHONE_NUMBER;

const makeCall = () => {
  client.calls
        .create({
           url: 'http://aaronpeddle.com:3000/call',
           to: targetPhone,
           from: '+16106098209',
           record: true,
         })
        .then(call => {
          console.log(call.sid);
        })
        .done();
}

module.exports = {makeCall};
