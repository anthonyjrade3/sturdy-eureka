const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'userinfo',
    description: 'Displays information about a user',
    execute(message, args) {
        try {
            const user = args.length ? message.mentions.users.first() : message.author;
            const member = message.guild.members.cache.get(user.id);

            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle(`User Info for ${user.tag}`)
                .setThumbnail(user.displayAvatarURL())
                .addFields(
                    { name: 'Username', value: user.tag, inline: true },
                    { name: 'User ID', value: user.id, inline: true },
                    { name: 'Joined Server On', value: member.joinedAt.toLocaleDateString(), inline: true },
                    { name: 'Account Created On', value: user.createdAt.toLocaleDateString(), inline: true }
                )
                .setTimestamp()
                .setFooter({ text: 'User Info' });

            message.channel.send({ embeds: [embed] });
        } catch (error) {
            console.error('Error executing userinfo command:', error);
            message.reply('❌ An error occurred while executing the userinfo command!');
        }
    }
};
