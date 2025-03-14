const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'ping',
    description: 'Shows the bot latency',
    execute: async (message, args) => {
        const pingEmbed = new EmbedBuilder()
            .setColor('#7F527F') // Your bot's role color
            .setTitle('🏓 Pong!')
            .setDescription(`Latency: **${Date.now() - message.createdTimestamp}ms**`)
            .setTimestamp()
            .setFooter({ text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL() });

        await message.reply({ embeds: [pingEmbed] });
    }
};
