module.exports = {
    name: 'untimeout',
    description: 'Untimeouts a user in the server',
    async execute(message, args) {
        // Check if the user has permission to untimeout members
        if (!message.member.permissions.has('MUTE_MEMBERS')) {
            return message.reply('❌ You don’t have permission to untimeout members!');
        }

        // Check if a user was mentioned
        const member = message.mentions.members.first();
        if (!member) return message.reply('❌ Mention a user to untimeout!');

        // Check if the bot has permission to untimeout the member
        if (!member.manageable) {
            return message.reply('❌ I do not have permission to untimeout this member!');
        }

        // Check if the member is already not muted
        if (!member.communicationDisabledUntil) {
            return message.reply('❌ This user is not muted!');
        }

        // untimeout the user by removing the timeout
        try {
            await member.timeout(null, 'untimeoutd by bot'); // Remove timeout to untimeout
            message.reply(`✅ untimeoutd ${member.user.tag}`);
        } catch (error) {
            console.error(error);
            message.reply('❌ An error occurred while trying to untimeout the user!');
        }
    }
};
