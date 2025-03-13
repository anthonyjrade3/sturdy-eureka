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

        // Mute the user
        try {
            await member.timeout(0, 'Muted by bot'); // Timeout for mute functionality
            message.reply(`✅ Muted ${member.user.tag}`);
        } catch (error) {
            console.error(error);
            message.reply('❌ An error occurred while trying to mute the user!');
        }
    }
};
