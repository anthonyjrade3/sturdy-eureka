const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Displays a list of all available commands',
    execute(message, args) {
        try {
            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('Bot Command List')
                .setDescription('Here are all the available commands:')
                .addFields(
                    { name: '+8ball', value: 'Ask the magic 8-ball a question' },
                    { name: '+joke', value: 'Get a random joke' },
                    { name: '+serverinfo', value: 'Displays information about the server' },
                    { name: '+userinfo', value: 'Displays information about a user' },
                    { name: '+ban', value: 'Bans a user from the server' },
                    { name: '+kick', value: 'Kicks a user from the server' },
                    { name: '+avatar', value: 'Get a user’s avatar' },
                    { name: '+weather', value: 'Get the weather for a location' },
                    { name: '+ping', value: 'The ping of the bot' },
                    { name: '+timeout', value: 'Timeouts a user for a specified duration (10s, 1m, 2h, etc.)' },
                    { name: '+untimeout', value: 'Untimeouts a user in the server' }
                )
                .setTimestamp()
                .setFooter({ text: 'Bot created by anthony' });

            message.channel.send({ embeds: [embed] });
        } catch (error) {
            console.error('Error executing help command:', error);
            message.reply('❌ An error occurred while executing the help command!');
        }
    }
};
