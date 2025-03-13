module.exports = {
    name: '8ball',
    description: 'Ask the magic 8-ball a question',
    execute(message, args) {
        if (!args.length) return message.reply('🎱 Ask a question!');
        const replies = ['Yes', 'No', 'Maybe', 'Definitely', 'Ask again later'];
        const response = replies[Math.floor(Math.random() * replies.length)];
        message.reply(`🎱 ${response}`);
    }
};