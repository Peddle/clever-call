const CleverbotAPI = require('cleverbot-api');
const cleverbot = new CleverbotAPI(process.env.CLEVER_BOT_SECRET);

const getCleverBotReply = (message) => {
  return new Promise((resolve, reject) => {
    cleverbot.getReply({
        input: message
    }, (error, response) => {
        if(error) reject(error);
        else resolve(response.output);
    });
  });
}

module.exports = {getCleverBotReply};
