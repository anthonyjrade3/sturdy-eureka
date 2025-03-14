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

        // Timeout (Mute) the user for a set duration (e.g., 10 minutes)
        try {
            // Set mute timeout (change 600000 to the desired time in ms)
            await member.timeout(600000, 'Muted by bot');
            message.reply(`✅ Muted ${member.user.tag} for 10 minutes.`);
        } catch (error) {
            console.error(error);
            message.reply('❌ An error occurred while trying to mute the user!');
        }
    }
};
