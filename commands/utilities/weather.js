const axios = require('axios');
module.exports = {
    name: 'weather',
    description: 'Get the weather for a location',
    async execute(message, args) {
        if (!args.length) return message.reply('🌤️ Provide a city name!');
        try {
            const response = await axios.get(`https://wttr.in/${args.join(' ')}?format=%C+%t`);
            message.reply(`🌤️ Weather in ${args.join(' ')}: ${response.data}`);
        } catch (error) {
            message.reply('⚠️ Failed to get weather.');
        }
    }
};