const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'ping',
    description: 'Shows the bot latency',
    execute: async (message, args) => {
        const start = Date.now();
        const msg = await message.reply('Pinging...');
        const latency = Date.now() - start;

        const pingEmbed = new EmbedBuilder()
            .setColor('#7F527F') // Your bot's role color
            .setTitle('🏓 Pong!')
            .setDescription(`Latency: **${latency}ms**`)
            .setTimestamp()
            .setFooter({ text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL() });

        await msg.edit({ content: '', embeds: [pingEmbed] });
    }
};
