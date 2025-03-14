const { EmbedBuilder } = require('discord.js');
const moment = require('moment'); // Install this package with "npm install moment"

module.exports = {
    name: 'serverinfo',
    description: 'Displays information about the server',
    execute(message) {
        const { guild } = message;
        const createdAt = moment(guild.createdAt).fromNow(); // "4 months ago", "2 years ago", etc.

        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle(`Server Info: ${guild.name}`)
            .setThumbnail(guild.iconURL({ dynamic: true }))
            .addFields(
                { name: '📆 Created', value: `${createdAt}`, inline: true },
                { name: '👤 Owner', value: `<@${guild.ownerId}>`, inline: true },
                { name: '🆔 Server ID', value: guild.id, inline: true },
                { name: '👥 Members', value: `${guild.memberCount}`, inline: true },
                { name: '💬 Channels', value: `${guild.channels.cache.size}`, inline: true },
                { name: '🌍 Region', value: guild.preferredLocale || 'Unknown', inline: true }
            )
            .setTimestamp()
            .setFooter({ text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL() });

        message.channel.send({ embeds: [embed] });
    }
};
