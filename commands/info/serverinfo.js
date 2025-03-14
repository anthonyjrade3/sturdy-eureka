const { EmbedBuilder } = require('discord.js');
const moment = require('moment');

module.exports = {
    name: 'serverinfo',
    description: 'Displays information about the server',
    execute(message) {
        const { guild } = message;
        const createdAt = moment(guild.createdAt).fromNow();

        // Categorize channels
        const categories = guild.channels.cache.filter(ch => ch.type === 4).size; // Category channels
        const textChannels = guild.channels.cache.filter(ch => ch.type === 0).size; // Text channels
        const voiceChannels = guild.channels.cache.filter(ch => ch.type === 2).size; // Voice channels
        const totalChannels = textChannels + voiceChannels; // Count without categories

        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle(`Server Info: ${guild.name}`)
            .setThumbnail(guild.iconURL({ dynamic: true }))
            .addFields(
                { name: '📆 Created', value: `${createdAt}`, inline: true },
                { name: '👤 Owner', value: `<@${guild.ownerId}>`, inline: true },
                { name: '🆔 Server ID', value: guild.id, inline: true },
                { name: '👥 Members', value: `${guild.memberCount}`, inline: true },
                { name: '📂 Categories', value: `${categories}`, inline: true },
                { name: '💬 Text Channels', value: `${textChannels}`, inline: true },
                { name: '🔊 Voice Channels', value: `${voiceChannels}`, inline: true },
                { name: '🌍 Region', value: guild.preferredLocale || 'Unknown', inline: true }
            )
            .setTimestamp()
            .setFooter({ text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL() });

        message.channel.send({ embeds: [embed] });
    }
};
