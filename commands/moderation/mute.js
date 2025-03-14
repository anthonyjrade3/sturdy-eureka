module.exports = {
    name: 'mute',
    description: 'Mutes a user for a specified duration (10s, 1m, 2h, etc.)',
    async execute(message, args) {
        // Check if the user has permission to mute members
        if (!message.member.permissions.has('MUTE_MEMBERS')) {
            return message.reply('❌ You don’t have permission to mute members!');
        }

        // Check if a user was mentioned or if username is provided
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) return message.reply('❌ Please mention a valid user or provide a username!');

        // Check if a valid duration was provided
        const duration = args[1];
        if (!duration) return message.reply('❌ You must specify a duration! For example: 10s, 1m, 2h, etc.');

        // Regular expression to match time formats (10s, 1m, 2h, 1d)
        const timeRegex = /^(\d+)(s|m|h|d)$/;
        const match = duration.match(timeRegex);

        if (!match) return message.reply('❌ Invalid duration format! Use something like: 10s, 1m, 2h, etc.');

        // Parse the duration and convert to milliseconds
        const amount = parseInt(match[1], 10);
        const unit = match[2];

        let muteDuration;

        switch (unit) {
            case 's': // Seconds
                muteDuration = amount * 1000;
                break;
            case 'm': // Minutes
                muteDuration = amount * 60 * 1000;
                break;
            case 'h': // Hours
                muteDuration = amount * 60 * 60 * 1000;
                break;
            case 'd': // Days
                muteDuration = amount * 24 * 60 * 60 * 1000;
                break;
            default:
                return message.reply('❌ Invalid time unit! Use s, m, h, or d.');
        }

        // Check if the mute duration is within the allowed range (10 seconds to 2 weeks)
        if (muteDuration < 10000) {
            muteDuration = 10000; // Set minimum to 10 seconds
        } else if (muteDuration > 1209600000) {
            muteDuration = 1209600000; // Set maximum to 2 weeks
        }

        // Mute the user
        try {
            await member.timeout(muteDuration, `Muted for ${muteDuration / 1000} seconds by bot`);
            message.reply(`✅ Muted ${member.user.tag} for ${muteDuration / 1000} seconds.`);
        } catch (error) {
            console.error(error);
            message.reply('❌ An error occurred while trying to mute the user!');
        }
    }
};
