module.exports = {
    name: 'unmute',
    description: 'Unmutes a user in the server',
    async execute(message, args) {
        // Check if the user has permission to unmute members
        if (!message.member.permissions.has('MUTE_MEMBERS')) {
            return message.reply('❌ You don’t have permission to unmute members!');
        }

        // Check if a user was mentioned
        const member = message.mentions.members.first();
        if (!member) return message.reply('❌ Mention a user to unmute!');

        // Check if the bot has permission to unmute the member
        if (!member.manageable) {
            return message.reply('❌ I do not have permission to unmute this member!');
        }

        // Check if the member is already not muted
        if (!member.communicationDisabledUntil) {
            return message.reply('❌ This user is not muted!');
        }

        // Unmute the user by removing the timeout
        try {
            await member.timeout(null, 'Unmuted by bot'); // Remove timeout to unmute
            message.reply(`✅ Unmuted ${member.user.tag}`);
        } catch (error) {
            console.error(error);
            message.reply('❌ An error occurred while trying to unmute the user!');
        }
    }
};
