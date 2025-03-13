const axios = require('axios');
module.exports = {
    name: 'joke',
    description: 'Get a random joke',
    async execute(message) {
        try {
            const response = await axios.get('https://official-joke-api.appspot.com/random_joke');
            message.reply(`${response.data.setup} - ${response.data.punchline}`);
        } catch (error) {
            message.reply('⚠️ Failed to fetch a joke.');
        }
    }
};