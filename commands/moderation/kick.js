module.exports = {
    name: 'kick',
    description: 'Kicks a user from the server',
    execute(message, args) {
        if (!message.member.permissions.has('KICK_MEMBERS')) {
            return message.reply('❌ You don’t have permission!');
        }

        // Check if the user is trying to kick themselves
        if (message.mentions.members.first() && message.mentions.members.first().id === message.author.id) {
            return message.reply('❌ You cannot kick yourself!');
        }

        const member = message.mentions.members.first();
        if (!member) return message.reply('❌ Mention a user to kick!');
        member.kick();
        message.reply(`✅ Kicked ${member.user.tag}`);
    }
};
