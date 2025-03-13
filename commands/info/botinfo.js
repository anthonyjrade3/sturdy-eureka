const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'botinfo',
    description: 'Displays information about the bot',
    execute(message, args) {
        try {
            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('Bot Info')
                .setThumbnail(message.client.user.displayAvatarURL())
                .addFields(
                    { name: 'Bot Name', value: message.client.user.tag, inline: true },
                    { name: 'Bot ID', value: message.client.user.id, inline: true },
                    { name: 'Servers', value: `${message.client.guilds.cache.size}`, inline: true },
                    { name: 'Users', value: `${message.client.users.cache.size}`, inline: true },
                    { name: 'Created On', value: message.client.user.createdAt.toLocaleDateString(), inline: true }
                )
                .setTimestamp()
                .setFooter({ text: 'Bot Info' });

            message.channel.send({ embeds: [embed] });
        } catch (error) {
            console.error('Error executing botinfo command:', error);
            message.reply('❌ An error occurred while executing the botinfo command!');
        }
    }
};
