const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'mute',
    description: 'Mutes a user in the server',
    async execute(message, args) {
        // Check if the user has permission to mute members
        if (!message.member.permissions.has('MUTE_MEMBERS')) {
            return message.reply('❌ You don’t have permission to mute members!');
        }

        // Check if a user was mentioned
        const member = message.mentions.members.first();
        if (!member) return message.reply('❌ Mention a user to mute!');

        // Check if the bot has permission to mute the member
        if (!member.manageable) {
            return message.reply('❌ I do not have permission to mute this member!');
        }

        // Set the maximum mute duration to 2 weeks (in milliseconds)
        const muteDuration = 1209600000; // 2 weeks in milliseconds

        // Timeout (Mute) the user for 2 weeks
        try {
            await member.timeout(muteDuration, 'Muted by bot for 2 weeks');
            message.reply(`✅ Muted ${member.user.tag} for 2 weeks.`);
        } catch (error) {
            console.error(error);
            message.reply('❌ An error occurred while trying to mute the user!');
        }
    }
};
