const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'serverinfo',
    description: 'Displays information about the server',
    execute(message, args) {
        try {
            const guild = message.guild;
            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle(`Server Info for ${guild.name}`)
                .setThumbnail(guild.iconURL())
                .addFields(
                    { name: 'Server Name', value: guild.name, inline: true },
                    { name: 'Server ID', value: guild.id, inline: true },
                    { name: 'Member Count', value: `${guild.memberCount}`, inline: true },
                    { name: 'Region', value: guild.preferredLocale, inline: true },
                    { name: 'Created On', value: guild.createdAt.toLocaleDateString(), inline: true }
                )
                .setTimestamp()
                .setFooter({ text: 'Server Info' });

            message.channel.send({ embeds: [embed] });
        } catch (error) {
            console.error('Error executing serverinfo command:', error);
            message.reply('❌ An error occurred while executing the serverinfo command!');
        }
    }
};
