module.exports = {
    name: 'unmute',
    description: 'Unmutes a user in the server',
    async execute(message, args) {
        // Check if the user has permission to mute members
        if (!message.member.permissions.has('MUTE_MEMBERS')) {
            return message.reply('❌ You don’t have permission to unmute members!');
        }

        // Check if a user was mentioned
        const member = message.mentions.members.first();
        if (!member) return message.reply('❌ Mention a user to unmute!');

        // Check if the user is currently muted
        if (!member.voice.serverMute) {
            return message.reply('❌ This user is not muted!');
        }

        // Unmute the user
        try {
            await member.voice.setMute(false, 'Unmuted by bot');
            message.reply(`✅ Successfully unmuted ${member.user.tag}`);
        } catch (error) {
            console.error(error);
            message.reply('❌ An error occurred while trying to unmute the user pls try again!');
        }
    }
};
