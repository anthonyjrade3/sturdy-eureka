const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: '8ball',
    description: 'Ask the magic 8-ball a question',
    execute(message, args) {
        const responses = [
            "The path ahead is shrouded in mystery, but trust your instincts.",
            "The data suggests a bright future, keep pushing forward!",
            "An unexpected opportunity may arise soon. Stay alert.",
            "Your actions will determine the outcome, make the right choice.",
            "The future is uncertain, but there is potential for greatness.",
            "Sometimes, the question itself is more important than the answer.",
            "The universe is constantly changing, stay flexible with your plans.",
            "The signs are unclear, but you have the power to shape your destiny.",
            "Everything is connected, and your next move could unlock something great.",
            "I see many possibilities, but only you can choose the right one.",
            "The data doesn't provide a clear answer, but the journey matters more.",
            "The possibilities are endless, take the leap and see where it leads."
        ];

        if (!args.length) {
            return message.reply('Please ask a question!');
        }

        const question = args.join(' ');
        const response = responses[Math.floor(Math.random() * responses.length)];

        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Magic 8-Ball Response')
            .setDescription(`You asked: **${question}**\n\nResponse: ${response}`)
            .setTimestamp()
            .setFooter({ text: 'Bot created by anthony' });

        message.channel.send({ embeds: [embed] });
    }
};
