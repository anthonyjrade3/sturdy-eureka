const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: '8ball',
    description: 'Ask the magic 8-ball any question!',
    execute(message, args) {
        // List of possible 8-ball responses
        const responses = [
            'Yes!',
            'No!',
            'Maybe...',
        ];

        // Pick a random response
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];

        // Create the embed message using EmbedBuilder
        try {
            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('Magic 8-Ball')
                .setDescription(`**Question:** ${args.join(' ')}\n**Answer:** ${randomResponse}`)
                .setTimestamp()
                .setFooter({ text: 'Bot created by anthony' });

            // Send the embed to the channel
            message.channel.send({ embeds: [embed] });
        } catch (error) {
            console.error('Error executing 8-ball command:', error);
            message.reply('❌ An error occurred while executing the 8-ball command!');
        }
    }
};
