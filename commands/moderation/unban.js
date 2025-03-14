module.exports = {
    name: 'unban',
    description: 'Unbans a user from the server by their ID',
    async execute(message, args) {
        // Check if the user has permission to unban members
        if (!message.member.permissions.has('BAN_MEMBERS')) {
            return message.reply('❌ You don’t have permission to unban members!');
        }

        // Check if a user ID was provided
        const userId = args[0];
        if (!userId) return message.reply('❌ Please provide the user ID to unban!');

        // Try to fetch the user from the ban list
        try {
            const bans = await message.guild.bans.fetch();
            const bannedUser = bans.find(ban => ban.user.id === userId);

            if (!bannedUser) {
                return message.reply('❌ This user is not banned!');
            }

            // Unban the user
            await message.guild.bans.remove(userId);

            message.reply(`✅ Successfully unbanned <@${userId}>!`);
        } catch (error) {
            console.error(error);
            message.reply('❌ An error occurred while trying to unban the user!');
        }
    }
};
