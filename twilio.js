const accountSid = 'AC191b8006e932bc401ec3afc16b095101';
const authToken = process.env.TWILIO_SECRET;
const client = require('twilio')(accountSid, authToken);


const makeCall = () => {
  client.calls
        .create({
           url: 'http://aaronpeddle.com:3000/call',
           to: '+12678087008',
           from: '+16106098209',
           record: true,
         })
        .then(call => {
          console.log(call.sid);
        })
        .done();
}

module.exports = {makeCall};
