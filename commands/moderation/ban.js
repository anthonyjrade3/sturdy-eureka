module.exports = {
    name: 'ban',
    description: 'Bans a user from the server',
    execute(message, args) {
        if (!message.member.permissions.has('BAN_MEMBERS')) return message.reply('❌ You don’t have permission!');
        const member = message.mentions.members.first();
        if (!member) return message.reply('❌ Mention a user to ban!');
        member.ban();
        message.reply(`✅ Banned ${member.user.tag}`);
    }
};