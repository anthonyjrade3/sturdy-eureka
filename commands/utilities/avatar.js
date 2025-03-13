module.exports = {
    name: 'avatar',
    description: 'Get a user’s avatar',
    execute(message) {
        const user = message.mentions.users.first() || message.author;
        message.reply(user.displayAvatarURL({ dynamic: true, size: 512 }));
    }
};